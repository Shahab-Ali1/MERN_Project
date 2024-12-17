import React, { useState } from "react";
import { ActionModal, AgGrid, GenericModal, GenericTextField } from "../SharedComponents/SharedComponents";
import GenericButton from "../GenericFiles/Common/Button/Button";
import { successToast } from '../../Utils/Toast/Toast'
import { ModalType } from "../../Utils/Constant/Constant";
import axios from 'axios';

const Category = () => {
    const [rowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true, otherFields: "any" },
        { make: "Ford", model: "F-Series", price: 33850, electric: false, otherFields: "any" },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false, otherFields: "any" },
        { make: "Tesla", model: "Model Y", price: 64950, electric: true, otherFields: "any" },
        { make: "Ford", model: "F-Series", price: 33850, electric: false, otherFields: "any" },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false, otherFields: "any" },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false, otherFields: "any" },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs] = useState([
        { headerName: "A", field: "make", width: 350, },
        { headerName: "A", field: "model", width: 150 },
        { headerName: "A", field: "price", width: 150 },
        { headerName: "A", field: "electric", flex: 1 }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const clickSave = () => {
        successToast("Record Saved Successfully")
        setIsOpen(true);
    }
    const [isError, setisError] = useState(false)
    const error = (params) => {
        setisError(true);
    }
    const Api = () => {
        axios.get("http://localhost:4000/api/users")
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <h4 className="text-sm font-bold text-gray-800">Category</h4>
            <main className="mt-2">
                <AgGrid
                    Data={rowData}
                    Columns={columnDefs}
                    onRowClicked={(params) => console.log("Row clicked:", params.data)}
                />
                {/* </div> */}
                <div className="grid lg:grid-cols-4 gap-1 mt-4">
                    <div>
                        <GenericTextField
                            label="Name"
                        />
                    </div>
                    <div style={{ backgroundColor: "green" }}>b</div>
                    <div style={{ backgroundColor: "pink" }}>c</div>
                    <div style={{ backgroundColor: "yellow" }}>d</div>
                </div>
                <GenericButton
                    text="Save"
                    onClick={clickSave}
                />
                <GenericButton
                    text="Error Modal"
                    onClick={error}
                />
                <GenericButton
                    text="Api"
                    onClick={Api}
                />
            </main>
            {isOpen &&
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
            }
        </div>
    );
};

export default Category;
