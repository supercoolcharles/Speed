import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import Dropdown from "../components/Dropdown.js";
import {list} from "../service/service.js";
import { Component } from "react";




class SEPractice extends Component {
 constructor(props) {
     super(props);
    this.state = {
        search: localStorage.getItem('search') || '',
        articles: [],
        tablecolumnsOrg: [
            {
                Header: 'Title',
                accessor: 'title',
                show: true
            }, {
                Header: 'Authors',
                accessor: 'authors',
                show: true
            }, {
                Header: 'Source',
                accessor: 'source',
                show: true
            }, {
                Header: 'Pub. Year',
                accessor: 'pubyear',
                show: true
            },{
                Header: 'DOI',
                accessor: 'doi',
                show: true
            },{
                Header: 'Claim',
                accessor: 'claim',
                show: true
            },{
                Header: 'Evidence',
                accessor: 'evidence',
                show: true
            },{
                Header: 'Status',
                accessor: 'status',
                show: true
            }],
        tablecolumns: [
            {
                Header: 'Title',
                accessor: 'title',
                show: true
            }, {
                Header: 'Authors',
                accessor: 'authors',
                show: true
            }, {
                Header: 'Source',
                accessor: 'source',
                show: true
            }, {
                Header: 'Pub. Year',
                accessor: 'pubyear',
                show: true
            },{
                Header: 'DOI',
                accessor: 'doi',
                show: true
            },{
                Header: 'Claim',
                accessor: 'claim',
                show: true
            },{
                Header: 'Evidence',
                accessor: 'evidence',
                show: true
            },{
                Header: 'Status',
                accessor: 'status',
                show: true
            }]
    }
    this.load();
 }

 toggleHead(name) {
    let list = this.state.tablecolumnsOrg.slice();
    let temp = list.filter(item => item.accessor == name);
    temp[0].show = !temp[0].show;
    let listnew = [];
    for(let i = 0; i < list.length; i++) {
        if(list[i].show) listnew.push(list[i]);
    }
    this.setState({tablecolumnsOrg: list, tablecolumns: listnew});

 }

 load() {
     localStorage.setItem('search', this.state.search)
    list({search: this.state.search}).then(rs => {
        this.setState({articles: rs.data})
    });
 }

 changeSearch(e) {
     this.setState({search: e.target.value})
 }

 render() {
     return (
        <div>
        <h2>List of SE Practice</h2>
        <input placeholder="Please input Search" value={this.state.search} onChange={(e) => this.changeSearch(e)}/><button onClick={() => this.load()}>Search</button>
        <Styles>
            {this.state.tablecolumnsOrg.map(item => <span>{item.show ? <input type="checkbox" checked name={item.accessor} onChange={()=>this.toggleHead(item.accessor)} /> : <input type="checkbox"  name={item.accessor} onChange={()=>this.toggleHead(item.accessor)} />}{item.Header+' '}</span>)}
        <Table
        data={this.state.articles}
        columns={this.state.tablecolumns}
        />
        </Styles>
        </div>
 );}
}
export default SEPractice;