import toast from 'react-hot-toast'

const ErrorCommonAxios = (error) => {
    if (error?.response?.data?.message) {
    toast.error(`${error?.response?.data?.message}`)
    } else if (error?.message) {
    toast.error(`${error?.message}`)
    } else if (error?.status) {
    toast.error(`${error?.status}`)
    } else {
    toast.error(`Error...`)
    }
}

export { ErrorCommonAxios }