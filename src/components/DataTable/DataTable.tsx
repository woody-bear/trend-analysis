import React from 'react';
import {dataObj} from "../../common/type";
import './DataTable.scss'

interface Props {
    data : dataObj;
}

const DataTable = ({data} : Props) => {

    return(
        <table>
            <thead>
                <tr>
                {
                    data.columns.map(column => <th>{column.name}</th>)
                }
                </tr>
            </thead>
            <tbody>
            {
                data.rows.map(row =>
                    <tr>
                        {
                            row.map((rowItem : any) =>
                            <td>
                                {rowItem}
                            </td>
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    )
};

export default DataTable