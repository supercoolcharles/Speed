import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import Dropdown from "../components/Dropdown.js";
import {list, pass, reject} from "../service/service.js";
import { Component } from "react";




class SEPractice extends Component {
 constructor(props) {
     super(props);
    this.state = {
        search: localStorage.getItem('search') || '',
        articles: []
    }
    this.load();
 }

 load() {
     localStorage.setItem('search', this.state.search)
    list({search: this.state.search, type: 'check'}).then(rs => {
        this.setState({articles: rs.data})
    });
 }

 changeSearch(e) {
     this.setState({search: e.target.value})
 }

 pass(row) {
    let evidence = prompt("Please input evidence");
    if(!evidence) {
        alert('Please input evidence');
        return;
    }
    pass(row.id, evidence).then(rs => {
        this.load();
        alert('pass success');
    }).catch(rs => {
        console.log(rs)
        alert(rs.response.data);
    });
 }

 reject(row) {
    let evidence = prompt("Please input evidence");
    if(!evidence) {
        alert('Please input evidence');
        return;
    }
    reject(row.id, evidence).then(rs => {
        this.load();
        alert('reject success');
    }).catch(rs => {
        console.log(rs)
        alert(rs.response.data);
    });
 }

 render() {
     return (
        <div>
        <h2>Check List</h2>
        <input placeholder="Please input Search" value={this.state.search} onChange={(e) => this.changeSearch(e)}/><button onClick={() => this.load()}>Search</button>
        <Styles>
        <Table
        data={this.state.articles}
        columns={[
            {
            Header: 'Title',
            accessor: 'title'
            }, {
            Header: 'Authors',
            accessor: 'authors'
            }, {
            Header: 'Source',
            accessor: 'source'
            }, {
            Header: 'Pub. Year',
            accessor: 'pubyear'
            },{
            Header: 'DOI',
            accessor: 'doi'
            },{
                Header: 'Claim',
                accessor: 'claim'
            },{
            Header: 'Evidence',
            accessor: 'evidence'
            },{
                Header: 'Status',
                accessor: 'status'
            },{
                Header: 'Option',
                accessor: 'Option',
                Cell: ({row}) => {
                    return <span>
                        <button onClick={() => this.pass(row.original)}>Pass</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => this.reject(row.original
                            )}>Reject</button>
                    </span>
                }
            }
            ]}
        />
        </Styles>
        </div>
 );}
}
export default SEPractice;