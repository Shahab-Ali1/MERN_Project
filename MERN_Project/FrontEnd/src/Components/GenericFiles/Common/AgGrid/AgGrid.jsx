import React from 'react'
import { AgGridReact } from 'ag-grid-react';
function AgGrid({ Data, Columns, onRowClicked }) {
    return (
        <React.Fragment>
            <div
                className="ag-theme-quartz"
                style={{ height: 200 }}
            >
                <AgGridReact
                    rowData={Data}
                    columnDefs={Columns}
                    rowSelection={"single"}
                    headerHeight={25}
                    rowHeight={25}
                    onRowClicked={onRowClicked}
                    defaultColDef={{
                        filter: true,
                        floatingFilter: true,
                    }}

                />
            </div>
        </React.Fragment>
    )
}

export default AgGrid
