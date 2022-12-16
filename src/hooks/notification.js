import { useToast } from "vue-toastification";

export default function useNotification() {
    const toast = useToast()

    function setSuccess({ title }) {
        toast.success(title);
    }
    function setResponseError({ error }) {
        const title = (error &&
            error.response &&
            error.response.data &&
            error.response.data.error && error.response.data.error.message || error.message || 'Failed to authenticate')
        toast.error(title);
    }

    return {
        setSuccess,
        setResponseError
    }
}
