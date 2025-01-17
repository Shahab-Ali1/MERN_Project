import React, { useEffect, useRef, useState, useCallback } from "react";
import { ActionModal, AgGrid, GenericTextField } from "../SharedComponents/SharedComponents";
import GenericButton from "../GenericFiles/Common/Button/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { codeError } from "../../Utils/Functions/Functions";
import { PostService } from "../../Utils/Service";
import { errorToast, successToast } from "../../Utils/Toast/Toast";
import { ModalType } from "../../Utils/Constant/Constant";
import JqxGridComponent from "../GenericFiles/Common/JqxGrid/JqxGrid";

const INITIAL_STATE = {
    name: "",
    description: "",
    status: true,
    _id: 0
};
const Category = () => {
    // Column Definitions: Defines the columns to be displayed.
    const [dataFields] = useState([
        { name: "_id", type: "string" },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "status", type: "string" },
    ]);
    const [columns] = useState([
        { text: "Name", datafield: "name", width: "40%", },
        { text: "Description", datafield: "description", width: "50%" },
        { text: "Status", datafield: "status", width: "10%", columnType: "checkbox", align: "center", },
    ]);
    const [formBtn, setformBtn] = useState(false);
    const inputRef = useRef(null)
    const GridRef = useRef(null)
    const [formData, setFormData] = useState({ ...INITIAL_STATE });
    const [isDisabled, setisDisabled] = useState(true)
    const [rowData, setrowData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, msg: "" });

    const getCategory = () => {
        try {
            PostService("/categories/getCategory", { status: true })
                .then((response) => {
                    if (response?.success) {
                        setrowData(response?.data);
                        setTimeout(() => {
                            let row = GridRef.current.getrowdata(0);
                            GridRef.current.selectrow(0)
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
    
   const onRowClick = useCallback((params) => {
    setFormData(params.args.row.bounddata)
      },
      [],
    )
    


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
                        setTimeout(() => {
                            let getrows = GridRef.current.getrows();
                            let row = getrows.find(x => x._id === response.data._id);
                            GridRef.current.selectrow(row.uid);
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
                            setTimeout(() => {
                                let getrows = GridRef.current.getrows();
                                let row = getrows.find(x => x._id === response.data._id);
                                GridRef.current.selectrow(row.uid);
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
            <h4 className="text-sm font-bold text-gray-800">Category</h4>
            <main className="mt-2">
                {/* <AgGrid
                    ref={GridRef}
                    Data={rowData}
                    Columns={columnDefs}
                    onRowClicked={(params) => setFormData(params.data)}
                /> */}
                <JqxGridComponent
                    gridRef={GridRef}
                    data={rowData}
                    dataFields={dataFields}
                    columns={columns}
                    onRowClick={onRowClick}
                    height={250}
                />
                {/* </div> */}
                <div className="grid lg:grid-cols-3 gap-1 mt-4">
                    <div>
                        <GenericTextField
                            ref={inputRef}
                            label="Name"
                            onChange={handleFormData}
                            name="name"
                            value={formData?.name}
                            disabled={isDisabled}
                        />
                    </div>
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

{/* {isOpen &&
                <GenericModal
                    title="Basic Modal"
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    height={"auto"}
                    width={800}
                >
                    <div>
                        <AgGrid
                            Data={rowData}
                            Columns={columnDefs}
                            onRowClicked={(params) => console.log("Row clicked:", params.data)}
                        />
                    </div>
                    <div className="mt-2 flex justifyEnd">
                        <GenericButton
                            text="Save"
                        />
                    </div>
                </GenericModal>
            }
            {isError &&
                <ActionModal
                    type={ModalType.confirmation}
                    message="Error Message"
                    open={isError}
                    onCancel={() => setisError(false)}
                    onOk={() => setisError(false)}
                />
            } */}

export default Category;


