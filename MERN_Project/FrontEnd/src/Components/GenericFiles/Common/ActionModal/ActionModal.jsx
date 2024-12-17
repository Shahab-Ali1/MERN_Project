import React from 'react';
import { Modal } from "antd";
import { GenericButton } from "../../../SharedComponents/SharedComponents";
import styles from "../Modal/Modal.module.css"

function ActionModal({
    title = "",
    open = false,
    onCancel = null,
    onOk = null,
    onYes = null,
    onNo = null,
    type,
    width = 400,
    height = 100,
    message = ""
}) {
    let headerTitle = String(type).charAt(0).toUpperCase() + String(type).slice(1);
    const renderFooter = () => {
        switch (type) {
            case "error":
                return (
                    <div className='flex justify-center mt-4'>
                        <GenericButton text="OK" onClick={onOk} style={{ width: "60px" }} />
                    </div>
                );
            case "confirmation":
                return (
                    <div className='flex justify-center gap-1 mt-4'>
                        <GenericButton text="No" onClick={onNo} style={{ width: "60px" }} />
                        <GenericButton text="Yes" onClick={onYes} style={{ width: "60px" }} />
                    </div>
                );
            default:
                return null;
        }
    }
    return (
        <div>
            <Modal
                title={
                    <div className={""}>
                        <span>{headerTitle}</span>
                    </div>
                }
                style={{ top: 20 }}
                open={open}
                onCancel={onCancel}
                footer={null}
                width={width}
                height={height}
            >
                <div className={styles.modalContent} style={{ height: height }}>
                    <p className='flex justify-center'>{message}</p>
                    {renderFooter()}
                </div>
            </Modal>
        </div>
    )
}

export default ActionModal
