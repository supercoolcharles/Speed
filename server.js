require('dotenv').config()
var bodyParser = require("body-parser");

const mongoose = require('mongoose') 

const path = require("path")

const express = require('express')

const app = express();

const encodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(path.resolve(__dirname, "./my-app/build")));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requestd-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// status E esists; O new; P pass; C reject; EC exists;
app.get("/list", function(request, response) {
  let type = request.query.type;
  let search = request.query.search || '';
  let orderby = request.query.orderby || 'title';
  let ordertype = (request.query.ordertype || '') == 'desc' ? '-' : '';
  var query = Articles.where({title: new RegExp(search)}).
  limit(999).
  sort(ordertype + orderby).
  exec((err, item) => {
    if (err) return handleError(err);
    if(type == 'check')
      item = item.filter(t => t.status == 'O' || t.status == 'EC' || t.status == 'E');
    else 
      item = item.filter(t => t.status == 'P' || t.status == 'C');
    item.forEach(t => t.status = t.status == 'P' ? 'Pass' : t.status == 'C' ? 'Reject' : t.status == 'E' ? 'Exists' : t.status == 'EC' ? 'Rejected Previously' : 'Pending review');
    console.log(item)
    if(item && item.length) {
      response.send(item);
    } else {
      response.send([]);
    }
  })
});

app.post("/save", encodedParser, function(request, response) {
  let id = "DID" + new Date().getTime() + Math.round(Math.random() * 999999);
  let title = request.query.title || '';
  let authors = request.query.authors || '';
  let source = request.query.source || '';
  let pubyear = request.query.pubyear || '';
  let doi = request.query.doi || '';
  let status = 'O';
  let retrytimes = 0;
  let cretime = new Date().getTime();
  let evidence = request.query.evidence || '';
  let claim = request.query.claim || '';
  console.log('req:', request.query)
  if(!title || !authors || !source || !pubyear || !doi) {
    response.status(500).send("error: params can not be empty");
    return;
  }
  
  Articles.find({title: title}).
  sort('-cretime').
  limit(1).
  exec((err, t) => {
    if(t && t.length) {
      // exists
      if(t[0].status == 'C')
        status = 'EC';
      else 
        status = 'E';
      retrytimes = t[0].retrytimes + 1;
    }

    const item = new Articles({
      id, title, authors, source, pubyear, doi, status, retrytimes, cretime, evidence, claim
    });
    item.save().then(() => {
      console.log('saved');
      response.send("success:" + id + " saved");
    }).catch(rs => {
      console.log('error:', rs);
      response.status(500).send("error:" + rs)
    })
    console.log('New data id:', id);
  });

});

app.post("/reject", encodedParser, function(request, response) {
  let id = request.query.id || '';
  let evidence = request.query.evidence || '';
  if(!id) {
    response.status(500).send("error: id can not be empty");
    return;
  }
  getOne(id, (err, item) => {
    console.log(item)
    if(item) {
      Articles.remove({id: id}).then(rs => {
        console.log(rs);
        new Articles({
          id: item.id, title: item.title, authors: item.authors, source: item.source, pubyear: item.pubyear, doi: item.doi, status: 'C', retrytimes: item.retrytimes, cretime: new Date().getTime(), evidence, claim: item.claim
        }).save().then(rs => console.log('reject ' + id));
      });
      response.send('success: changed');
    } else {
      response.send("success: not found");
    }
    if (err) return handleError(err);
  })
});

app.post("/pass",encodedParser, function(request, response) {
  let id = request.query.id || '';
  let evidence = request.query.evidence || '';
  if(!id) {
    response.status(500).send("error: id can not be empty");
    return;
  }
  getOne(id, (err, item) => {
    console.log(item)
    if(item) {
      Articles.remove({id: id}).then(rs => {
        console.log(rs);
        new Articles({
          id: item.id, title: item.title, authors: item.authors, source: item.source, pubyear: item.pubyear, doi: item.doi, status: 'P', retrytimes: item.retrytimes, cretime: new Date().getTime(), evidence, claim: item.claim
        }).save().then(rs => console.log('pass ' + id));
      });
      response.send('success: pass');
    } else {
      response.send("success: not found");
    }
    if (err) return handleError(err);
  })
});

app.post("/remove", function(request, response) {
  let id = request.query.id || '';
  if(!id) {
    response.status(500).send("error: id can not be empty");
    return;
  }
  Articles.remove({id: id}).then(rs => {
    console.log(rs);
  });
  response.send("success: remove");
})

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
});

function getOne(id, cb) {
  var query = Articles.findOne({id: id}).
  limit(1).
  exec((err, item) => {
    cb && cb(err, item);
  });
}

const port = process.env.PORT || 8080
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))

// define table
const Articles = mongoose.model('articles', new mongoose.Schema({
  id: String, title: String, authors: String, source: String, pubyear: String, doi: String, status: String, retrytimes: Number, cretime: Number, evidence: String, claim: String
}));

const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
)


