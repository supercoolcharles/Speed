const tablecolumnscheck = [
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
                <button>Pass</button>
                <button>Reject</button>
            </span>
        }
    }
    ]
    module.exports = tablecolumnscheck