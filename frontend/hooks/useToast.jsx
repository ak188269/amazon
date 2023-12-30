"use client";
import toast from "react-hot-toast";

const useToast = () => {
  return (message, type) => {
    if (type == "success") toast.success(message);
    else if (type == "error") toast.error(message);
    else if (type == "warning") toast.warning(message);
    else if (type == "info") toast.info(message);
    else toast(message, type);
  };
};

export default useToast;
