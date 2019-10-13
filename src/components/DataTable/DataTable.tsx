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
                    data.columns.map((column, idx) => <th key={idx}>{column.name}</th>)
                }
                </tr>
            </thead>
            <tbody>
            {
                data.rows.map((row, idx) =>
                    <tr key={idx}>
                        {
                            row.map((rowItem : any, idx : number) =>
                            <td key={idx}>
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