import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export default function useAuth () {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('auth context must be used within authProvider')
    }

    return authContext
}