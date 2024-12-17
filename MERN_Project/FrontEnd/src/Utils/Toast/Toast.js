import { toast } from "react-toastify";

export const successToast = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000, // Toast disappears after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

// Toast for error
export const errorToast = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

// Toast for warning
export const warningToast = (msg) => {
    toast.warn(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};