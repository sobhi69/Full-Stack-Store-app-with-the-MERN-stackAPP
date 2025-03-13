import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type IsRegisteringContextType = {
    isRegistering: boolean,
    setIsRegistering: Dispatch<SetStateAction<boolean>>
}

export const IsRegisteringContext = createContext<IsRegisteringContextType | undefined>(undefined)

interface IsRegisteringProviderProps {
    children: ReactNode
}

export const IsRegisteringProvider: FC<IsRegisteringProviderProps> = ({ children }) => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    return (
        <IsRegisteringContext.Provider value={{ isRegistering, setIsRegistering }}>
            {children}
        </IsRegisteringContext.Provider>
    )
}