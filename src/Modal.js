
import React from "react";
 
const Modal = ({ isOpen, onClose, children, content}) => {
    if (!isOpen) return null;
 
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    height: '90%',
                    width: '80%',
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    textAlign:'center',
                    overflowY:'scroll'
                }}
            >
                    <p>{content}</p>
            </div>
        </div>
    );
};
 
export default Modal;