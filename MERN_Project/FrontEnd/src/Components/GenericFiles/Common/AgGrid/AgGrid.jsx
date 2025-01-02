import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
function AgGrid({ Data, Columns, onRowClicked, ref }) {

    const onFirstDataRendered = (params) => {
        if (Data && Data.length > 0) {
            params.api.getDisplayedRowAtIndex(0).setSelected(true);
        }
    };

    return (
        <React.Fragment>
            <div
                className="ag-theme-quartz"
                style={{ height: 200 }}
            >
                <AgGridReact
                    ref={ref} // Attach the refrence
                    rowData={Data}
                    columnDefs={Columns}
                    rowSelection={"single"}
                    headerHeight={25}
                    rowHeight={25}
                    onRowClicked={onRowClicked}
                    onFirstDataRendered={onFirstDataRendered} // Attach the event
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
