import React, { useEffect, useRef, useState } from "react";
import { ActionModal, AgGrid, GenericDropdown, GenericTextField } from "../SharedComponents/SharedComponents";
import GenericButton from "../GenericFiles/Common/Button/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { codeError } from "../../Utils/Functions/Functions";
import { PostService } from "../../Utils/Service";
import { errorToast, successToast } from "../../Utils/Toast/Toast";
import { ModalType } from "../../Utils/Constant/Constant";


const INITIAL_STATE = {
    name: "",
    description: "",
    status: true,
    _id: 0,
    category:""
};
const Product = () => {
    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs] = useState([
        { headerName: "Name", field: "name", width: 500, },
        { headerName: "Description", field: "description", width: 520 },
        { headerName: "Price", field: "price", width: 520 },
        { headerName: "Stock", field: "stock", width: 520 },
        { headerName: "Category", field: "category", width: 520 },
        { headerName: "Status", field: "status", width: 150, cellStyle: { textAlign: 'center' }, },
    ]);
    const [formBtn, setformBtn] = useState(false);
    const inputRef = useRef(null)
    const GridRef = useRef(null)
    const [formData, setFormData] = useState({ ...INITIAL_STATE });
    const [isDisabled, setisDisabled] = useState(true)
    const [CategoryData, setCategoryData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, msg: "" });

    const getCategory = () => {
        try {
            PostService("/categories/getCategory", { status: true })
                .then((response) => {
                    if (response?.success) {
                        setCategoryData(response?.data);
                        setTimeout(() => {
                            setFormData(GridRef.current.api.getSelectedRows()[0])
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


    const handleFormData = (event) => {
        try {
            const { name, value, type, checked } = event.target;
            if (type === "checkbox") {
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
            if (GridRef && GridRef.current?.api) {
                setFormData(GridRef.current.api.getSelectedRows()[0]);
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
                categoryId: formData?._id,
                name: formData.name,
                description: formData.description,
                status: formData.status
            }
            PostService("/categories/updateCategory", obj)
                .then((response) => {
                    if (response?.success) {
                        successToast("Record Update Successfully");
                        getCategory();
                        disableField();
                        debugger;
                        setTimeout(() => {
                            let getrows = GridRef.current.api.getRenderedNodes().map(node => node.data);
                            let row = getrows.find(x => x._id === response.data._id);
                            GridRef.current.api.forEachNode((node) => {
                                if (node.data._id === row._id) {
                                    node.setSelected(true); // Select the node
                                }
                            });
                            setFormData(row);
                            debugger;
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
            if (formData?._id === 0) {
                let obj = {
                    name: formData.name,
                    description: formData.description,
                    status: formData.status
                }
                PostService("/categories/addCategory", obj)
                    .then((response) => {
                        if (response?.success) {
                            successToast("Record Saved Successfully");
                            getCategory();
                            disableField();
                            debugger;
                            setTimeout(() => {
                                let getrows = GridRef.current.api.getRenderedNodes().map(node => node.data);
                                let row = getrows.find(x => x._id === response.data._id);
                                GridRef.current.api.forEachNode((node) => {
                                    if (node.data._id === row._id) {
                                        node.setSelected(true); // Select the node
                                    }
                                });
                                setFormData(row);
                                debugger;
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
                categoryId: formData?._id,
            }
            PostService("/categories/deleteCategory", obj)
                .then((response) => {
                    if (response?.success) {
                        successToast("Record Deleted Successfully");
                        getCategory();
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
                <AgGrid
                    ref={GridRef}
                    // Data={rowData}
                    Columns={columnDefs}
                    onRowClicked={(params) => setFormData(params.data)}
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
                        name="category"
                        value={formData?.category}
                        onChange={handleFormData}
                        options={CategoryData}
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