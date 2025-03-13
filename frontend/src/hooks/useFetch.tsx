import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'


export default function useFetch(url: string) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        const getData = async () => {
            try {
                const response = await axiosInstance.get(url)
                const dataRes = await response.data
                setData(dataRes)

            } catch (error: any) {
                const errMess = await error.response.data.message
                alert(errMess)
                setError(errMess)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [url])

    return {data,isLoading,error}

}