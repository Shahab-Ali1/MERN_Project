import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActionModal, AgGrid, GenericDropdown, GenericTextField } from "../SharedComponents/SharedComponents";
import GenericButton from "../GenericFiles/Common/Button/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { codeError } from "../../Utils/Functions/Functions";
import { PostService } from "../../Utils/Service";
import { errorToast, successToast } from "../../Utils/Toast/Toast";
import { ModalType } from "../../Utils/Constant/Constant";
import JqxGridComponent from "../GenericFiles/Common/JqxGrid/JqxGrid";

const INITIAL_STATE = {
    _id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: true,
    categoryId: ""
};
const Product = () => {
    // Column Definitions: Defines the columns to be displayed.
    const [dataFields] = useState([
        { name: "_id", type: "string" },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "price", type: "string" },
        { name: "stock", type: "string" },
        { name: "category", type: "string" },
        { name: "status", type: "string" },
    ]);
    // const [columnDefs] = useState([
    //     { headerName: "Name", field: "name", width: 300, },
    //     { headerName: "Description", field: "description", width: 240 },
    //     { headerName: "Price", field: "price", width: 150 },
    //     { headerName: "Stock", field: "stock", width: 150 },
    //     { headerName: "Category", field: "category", width: 220, valueGetter: (params) => params.data.category?.name || "", },
    //     { headerName: "Status", field: "status", width: 100, cellStyle: { textAlign: 'center' }, },
    // ]);
    const [columns] = useState([
        { text: "Name", datafield: "name", width: "30%", },
        { text: "Description", datafield: "description", width: "25%" },
        { text: "Price", datafield: "price", width: "15%" },
        { text: "Stock", datafield: "stock", width: "15%" },
        {
            text: "Category", datafield: "category", width: "10%",
            cellsrenderer: (row, column, value) => value?.name || "",
            //     {
            //     debugger;
            //     return <span>{value?.name || ""}</span>
            // },
        },
        { text: "Status", datafield: "status", width: "5%", columnType: "checkbox", align: "center", },
    ]);
    const [formBtn, setformBtn] = useState(false);
    const inputRef = useRef(null)
    const GridRef = useRef(null)
    const [formData, setFormData] = useState({ ...INITIAL_STATE });
    const [isDisabled, setisDisabled] = useState(true)
    const [CategoryData, setCategoryData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, msg: "" });
    const [dataForGrid, setDataForGrid] = useState([])

    const getCategory = () => {
        try {
            PostService("/categories/getCategory", { status: true })
                .then((response) => {
                    if (response?.success) {
                        setCategoryData(response?.data);
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }
    const getProduct = () => {
        try {
            PostService("/products/getProduct", { status: true })
                .then((response) => {
                    if (response?.success) {
                        setDataForGrid(response?.data);
                        setTimeout(() => {
                            debugger;
                            let row = GridRef?.current?.getrowdata(0);
                            GridRef.current.selectrow(0);
                            setFormData(row)
                        }, 100);
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }
    useEffect(() => {
        try {
            getProduct();
            getCategory();
        } catch (error) {
            codeError(error);
        }
    }, []);

    const enableField = () => {
        setformBtn(true);
        setisDisabled(false);
    }
    const disableField = (params) => {
        setformBtn(false);
        setisDisabled(true);
    }

    const onRowClicked = useCallback((params) => {
        let data = { ...params.args.row.bounddata, categoryId: params.args.row.bounddata.category?._id };
        setFormData(data);
    },
        [],
    )



    const handleFormData = (event) => {
        try {
            const { name, value, type, checked } = event.target;
            if (type && type === "checkbox") {
                setFormData({ ...formData, [name]: checked });
            }
            else {
                setFormData({ ...formData, [name]: value });
            }
        } catch (error) {
            codeError(error);

        }
    }

    const clickNewItem = () => {
        enableField();
        setFormData({ ...INITIAL_STATE });
        inputRef.current.focus();
    }

    const clickEditItem = () => {
        enableField();
    }


    const clickCancelBtn = () => {
        try {
            if (GridRef && GridRef.current) {
                let selectedRow = GridRef.current.getrowdata(GridRef.current.getselectedrowindex());
                setFormData(selectedRow);
                disableField();
            }
        } catch (error) {
            codeError(error);
        }
    }

    const clickCloseBtn = () => {
        disableField();
    }

    const handleUpdate = () => {
        try {
            let obj = {
                productId: formData._id,
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: formData.status,
                categoryId: formData.categoryId
            }
            PostService("/products/updateProduct", obj)
                .then((response) => {
                    if (response?.success) {
                        successToast("Record Update Successfully");
                        getProduct();
                        disableField();
                        setTimeout(() => {
                            let getrows = GridRef.current.api.getRenderedNodes().map(node => node.data);
                            let row = getrows.find(x => x._id === response.data._id);
                            GridRef.current.api.forEachNode((node) => {
                                if (node.data._id === row._id) {
                                    node.setSelected(true); // Select the node
                                }
                            });
                            setFormData(row);
                        }, 500);
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }

    const clickSaveBtn = () => {
        try {
            if (formData.name.trim() === "") {
                return errorToast("Name is required");
            }
            else if (formData.price === 0) {
                return errorToast("Price is required");
            }
            else if (formData.stock === 0) {
                return errorToast("Stock is required");
            }
            else if (formData.categoryId.trim() === "") {
                return errorToast("Category is required");
            }
            if (formData?._id === 0) {
                let obj = {
                    name: formData.name,
                    description: formData.description,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    status: formData.status,
                    categoryId: formData.categoryId
                }
                PostService("/products/addProduct", obj)
                    .then((response) => {
                        if (response?.success) {
                            successToast("Record Saved Successfully");
                            getProduct();
                            disableField();
                            setTimeout(() => {
                                let getrows = GridRef.current.api.getRenderedNodes().map(node => node.data);
                                let row = getrows.find(x => x._id === response.data._id);
                                GridRef.current.api.forEachNode((node) => {
                                    if (node.data._id === row._id) {
                                        node.setSelected(true); // Select the node
                                    }
                                });
                                setFormData(row);
                            }, 500);
                        }
                    }).catch((error) => {
                        errorToast(error?.message);
                    })
            }
            else {
                handleUpdate()
            }
        } catch (error) {
            codeError(error);
        }
    }

    const clickDeleteBtn = () => {
        try {
            if (!formData?._id) {
                return errorToast("Please Select First");
            }
            setDeleteConfirmation({ show: true, msg: "Are you sure you want to delete this record?" })

        } catch (error) {
            codeError(error);
        }
    }

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ show: false, msg: "" });
    }

    const handleDelete = () => {
        try {
            closeDeleteConfirmation();
            let obj = {
                productId: formData?._id,
            }
            PostService("/products/deleteProduct", obj)
                .then((response) => {
                    if (response?.success) {
                        successToast("Record Deleted Successfully");
                        getProduct();
                        disableField();
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }





    return (
        <div>
            {deleteConfirmation?.show &&
                <ActionModal
                    type={ModalType.confirmation}
                    message={deleteConfirmation?.msg}
                    open={deleteConfirmation?.show}
                    onCancel={closeDeleteConfirmation}
                    onNo={closeDeleteConfirmation}
                    onYes={handleDelete}
                />
            }
            <h4 className="text-sm font-bold text-gray-800">Product</h4>
            <main className="mt-2">
                {/* <AgGrid
                    ref={GridRef}
                    Data={dataForGrid}
                    Columns={columnDefs}
                    onRowClicked={onRowClicked}
                /> */}
                <JqxGridComponent
                    gridRef={GridRef}
                    data={dataForGrid}
                    dataFields={dataFields}
                    columns={columns}
                    onRowClick={onRowClicked}
                    height={250}
                />
                {/* </div> */}
                <div className="grid lg:grid-cols-3 gap-1 mt-4">
                    {/* <div> */}
                    <GenericTextField
                        ref={inputRef}
                        label="Name"
                        onChange={handleFormData}
                        name="name"
                        value={formData?.name}
                        disabled={isDisabled}
                    />
                    <GenericTextField
                        ref={inputRef}
                        label="Price"
                        type="number"
                        onChange={handleFormData}
                        name="price"
                        value={formData?.price}
                        disabled={isDisabled}
                        inputProps={{
                            min: 0, // Prevent input less than 0
                        }}
                    />
                    <GenericTextField
                        ref={inputRef}
                        label="Stock"
                        type="number"
                        onChange={handleFormData}
                        name="stock"
                        value={formData?.stock}
                        disabled={isDisabled}
                        inputProps={{
                            min: 0, // Prevent input less than 0
                        }}
                    />
                    {/* </div> */}
                </div>

                <div className="grid lg:grid-cols-3 gap-1 mt-2">
                    <GenericDropdown
                        label="Category"
                        name="categoryId"
                        value={formData?.categoryId}
                        onChange={handleFormData}
                        options={CategoryData}
                        valueId={"_id"}
                        displayValue={"name"}
                        disabled={isDisabled}
                    />
                </div>
                <div className="grid lg:grid-cols-3 gap-1 mt-2">
                    <GenericTextField
                        label="Description"
                        onChange={handleFormData}
                        name="description"
                        value={formData?.description}
                        multiline={true}
                        rows={4}
                        disabled={isDisabled}
                    />
                    <div className="mt-auto">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={handleFormData} name="status" checked={formData?.status} value={formData?.status} disabled={isDisabled} />} label="Status" />
                        </FormGroup>
                    </div>
                </div>

                <div className="mt-8">
                    {!formBtn ? <span className="flex gap-1">
                        <GenericButton
                            text="New Item"
                            onClick={clickNewItem}
                        />
                        <GenericButton
                            text="Edit Item"
                            onClick={clickEditItem}
                        />
                        <GenericButton
                            text="Delete"
                            onClick={clickDeleteBtn}
                        />
                        <GenericButton
                            text="Close"
                        />
                    </span> :
                        <span className="flex gap-1">
                            <GenericButton
                                text="New"
                            />
                            <GenericButton
                                text="Save"
                                onClick={clickSaveBtn}
                            />
                            <GenericButton
                                text="Cancel"
                                onClick={clickCancelBtn}
                            />
                            <GenericButton
                                text="Close"
                                onClick={clickCloseBtn}
                            />
                        </span>
                    }
                </div>
            </main>

        </div>
    );
};

export default Product;