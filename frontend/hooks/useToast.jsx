'use client'
import toast from 'react-hot-toast'

const useToast = () => {
  return (message , type )=>{
    if(type == "success")
    toast.success(message)
    else toast(message, type)
  }
}

export default useToast