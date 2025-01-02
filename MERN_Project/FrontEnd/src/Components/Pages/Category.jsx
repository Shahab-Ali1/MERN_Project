import React, { useEffect, useRef, useState } from "react";
import { AgGrid, GenericTextField } from "../SharedComponents/SharedComponents";
import GenericButton from "../GenericFiles/Common/Button/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { codeError } from "../../Utils/Functions/Functions";
import { PostService } from "../../Utils/Service";
import { errorToast, successToast } from "../../Utils/Toast/Toast";
import FormItemInput from "antd/es/form/FormItemInput";

const INITIAL_STATE = {
    name: "",
    description: "",
    status: true
};
const Category = () => {
    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs] = useState([
        { headerName: "Name", field: "name", width: 500, },
        { headerName: "Description", field: "description", width: 520 },
        { headerName: "Status", field: "status", width: 150 },
    ]);
    const [formBtn, setformBtn] = useState(false);
    const inputRef = useRef(null)
    const [formData, setFormData] = useState({ ...INITIAL_STATE });
    const [isDisabled, setisDisabled] = useState(true)
    const [rowData, setrowData] = useState([]);

    useEffect(() => {
        try {
            PostService("/categories/getCategory", { status: true })
                .then((response) => {
                    if (response?.success) {
                        setrowData(response?.data);
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }, []);

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
        setformBtn(true);
        setisDisabled(false);
        setFormData({ ...INITIAL_STATE });
        inputRef.current.focus();
    }
    const clickCloseBtn = () => {
        setformBtn(false);
        setisDisabled(true);
    }
    const clickSaveBtn = () => {
        try {
            if (formData.name.trim() === "") {
                return errorToast("Name is required");
            }
            let obj = {
                name: formData.name,
                description: formData.description,
                status: formData.status
            }
            PostService("/categories/addCategory", obj)
                .then((response) => {
                    if (response?.success) {
                        successToast("Record Saved Successfully")
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
            <h4 className="text-sm font-bold text-gray-800">Category</h4>
            <main className="mt-2">
                <AgGrid
                    Data={rowData}
                    Columns={columnDefs}
                    onRowClicked={(params) => setFormData(params.data)}
                />
                {/* </div> */}
                <div className="grid lg:grid-cols-3 gap-1 mt-4">
                    <div>
                        <GenericTextField
                            ref={inputRef}
                            label="Name"
                            onChange={handleFormData}
                            name="name"
                            value={formData.name}
                            disabled={isDisabled}
                        />
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-1 mt-2">
                    <GenericTextField
                        label="Description"
                        onChange={handleFormData}
                        name="description"
                        value={formData.description}
                        multiline={true}
                        rows={4}
                        disabled={isDisabled}
                    />
                    <div className="mt-auto">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={handleFormData} name="status" checked={formData.status} value={formData.status} disabled={isDisabled} />} label="Status" />
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
                        />
                        <GenericButton
                            text="Delete"
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


