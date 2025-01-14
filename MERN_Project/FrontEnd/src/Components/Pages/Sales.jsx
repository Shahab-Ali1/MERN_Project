import React, { useState } from "react";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import { GenericTextField } from "../SharedComponents/SharedComponents";
import JqxGridComponent from "../GenericFiles/Common/JqxGrid/JqxGrid";
const SalesForm = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const products = [
        { id: 1, name: "Bread", price: 50, stock: 10, category: "Bakery", status: true },
        { id: 2, name: "Cake", price: 300, stock: 5, category: "Bakery", status: true },
        { id: 3, name: "Pastry", price: 150, stock: 8, category: "Dessert", status: true },
    ];

    const productFields = [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        { name: "price", type: "number" },
        { name: "stock", type: "number" },
        { name: "category", type: "string" },
    ];

    const saleFields = [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        { name: "price", type: "number" },
        { name: "quantity", type: "number" },
        { name: "total", type: "number" },
    ];

    const productSource = new jqx.dataAdapter({
        localdata: products,
        datafields: productFields,
        datatype: "array",
    });

    const saleSource = new jqx.dataAdapter({
        localdata: selectedItems,
        datafields: saleFields,
        datatype: "array",
    });

    const productColumns = [
        { text: "Name", datafield: "name", width: "30%" },
        { text: "Price", datafield: "price", width: "20%" },
        { text: "Stock", datafield: "stock", width: "20%" },
        { text: "Category", datafield: "category", width: "20%" },
        {
            text: "Add",
            width: "10%",
            cellsrenderer: () => {
                return `<button class="add-button" style="color: white; background-color: #c2410c; border: none; padding: 5px 10px; cursor: pointer;">
                    <i class="fas fa-plus"></i>
                </button>`;
            },

        },
    ];

    const saleColumns = [
        { text: "Name", datafield: "name", width: "40%" },
        { text: "Price", datafield: "price", width: "20%" },
        { text: "Quantity", datafield: "quantity", width: "20%" },
        { text: "Total", datafield: "total", width: "20%" },
    ];

    const handleProductClick = (event) => {
        const rowIndex = event.args.rowindex;
        const product = products[rowIndex];

        const existingItem = selectedItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedItems = selectedItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1, total: item.total + product.price }
                    : item
            );
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([
                ...selectedItems,
                { ...product, quantity: 1, total: product.price },
            ]);
        }

        setTotalPrice((prevTotal) => prevTotal + product.price);
    };

    const handleRowClick = (event) => {
        const rowIndex = event.args.rowindex;
        const item = selectedItems[rowIndex];

        setSelectedItems(selectedItems.filter((_, index) => index !== rowIndex));
        setTotalPrice((prevTotal) => prevTotal - item.total);
    };

    const handleSubmitSale = () => {
        console.log("Customer Name:", customerName);
        console.log("Selected Items:", selectedItems);
        console.log("Total Price:", totalPrice);

        setCustomerName("");
        setSelectedItems([]);
        setTotalPrice(0);

        alert("Sale submitted successfully!");
    };

    return (
        <div>
            <h4 className="text-sm font-bold text-gray-800">Sales</h4>

            <div style={{ display: "flex", gap: "20px" }}>
                {/* Product Grid */}
                <div style={{ flex: 2 }}>
                    <h3>Available Products</h3>
                    <JqxGridComponent
                        datafields={productFields}
                        columns={productColumns}
                        data={products}
                        onCellclick={handleProductClick}
                        height={400}
                    />
                </div>

                {/* Sale Details Grid */}
                <div style={{ flex: 1 }}>
                    <h3>Sale Details</h3>
                    <JqxGridComponent
                        datafields={saleFields}
                        columns={saleColumns}
                        data={selectedItems}
                        onCellclick={handleRowClick}
                        height={400}
                    />
                    <div className="flex items-center my-4">
                        {/* Customer Name TextField */}
                        <div className="flex-2 mr-4">
                            <GenericTextField
                                label={"Customer Name"}
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="flex-2 mr-4 w-1/4">
                            <GenericTextField
                                label={"Discount"}
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                        </div>

                        {/* Total Price */}
                        <h4 className="text-md font-bold">Total Price: {(totalPrice - discount) ?? 0}</h4>
                    </div>
                    <div>
                        <button
                            style={{
                                padding: "10px 15px",
                                marginRight: "10px",
                                backgroundColor: "#c2410c",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onClick={handleSubmitSale}
                        >
                            Submit Sale
                        </button>
                        <button
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#ccc",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setCustomerName("");
                                setSelectedItems([]);
                                setTotalPrice(0);
                            }}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>

            {/* Action Buttons */}
            {/* <div>
                <button
                    style={{
                        padding: "10px 15px",
                        marginRight: "10px",
                        backgroundColor: "#c2410c",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={handleSubmitSale}
                >
                    Submit Sale
                </button>
                <button
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#ccc",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setCustomerName("");
                        setSelectedItems([]);
                        setTotalPrice(0);
                    }}
                >
                    Cancel
                </button>
            </div> */}
        </div>
    );
};

export default SalesForm;
