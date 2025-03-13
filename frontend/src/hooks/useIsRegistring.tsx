import { useContext } from 'react'
import { IsRegisteringContext } from '../context/IsRegistringContext'


export default function useIsRegistring() {
    const isRegisteringContext = useContext(IsRegisteringContext)


    if (!isRegisteringContext) {
        throw new Error('isRegistering context must be used within isRegsiteringProvider')
    }
    return isRegisteringContext
}