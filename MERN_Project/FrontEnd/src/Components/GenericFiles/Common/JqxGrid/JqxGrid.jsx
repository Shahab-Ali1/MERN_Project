import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import React, { useMemo } from "react";

const JqxGridComponent = ({
    data = [],            // Array of data to populate the grid
    dataFields = [],      // Array of data fields for jqxGrid
    columns = [],         // Array of column definitions
    gridRef = null,       // Ref to access grid functions
    onRowClick = null,    // Callback for row click event
    height = 360,         // Height of the grid
    width = "100%",       // Width of the grid
    ...rest               // Other jqxGrid props
}) => {
    
    // Memoize data source to improve performance
    const source = useMemo(() => {
        return new jqx.dataAdapter({
            localdata: data,
            datafields: dataFields,
            datatype: "json",
        });
    }, [data, dataFields]);

    return (
        <JqxGrid
            source={source}
            columns={columns}
            height={height}
            width={width}
            ref={gridRef}
            onRowclick={onRowClick}
            columnsheight={25}
            rowsheight={25}
            columnsresize={true}
            columnsreorder={true}
            sortable={true}
            filterable={true}
            showfilterrow={true}
            showsortmenuitems={false}
            // selectedrowindex={0}
            {...rest} // Spread additional props
        />
    );
};

export default React.memo(JqxGridComponent);
