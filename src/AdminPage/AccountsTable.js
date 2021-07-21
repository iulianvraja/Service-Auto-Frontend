import React from "react";
import Table from "../commons/tables/table";




const filters = [
    {
        accessor: 'username',
    }
];

class AccountTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            columns :[
                    {
                        Header: 'id',
                        accessor: 'account_id',
                    },
                    {
                        Header: 'Username',
                        accessor: 'username',
                    },
                    {
                        Header: 'Parola',
                        accessor: 'password',
                    },

                    {
                        Header:'Rol',
                        accessor:'role',
                      },

                ],
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={this.state.columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default AccountTable;
