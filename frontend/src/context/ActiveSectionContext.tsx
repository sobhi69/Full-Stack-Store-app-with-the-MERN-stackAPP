import { createContext, FC, ReactNode, SetStateAction, useState } from "react";

type ActiveSectionContextType = {
    active: string,
    setActive: React.Dispatch<SetStateAction<string>>
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

interface ActiveSectionProviderProps {
    children: ReactNode
}

export const ActiveSectionProvider: FC<ActiveSectionProviderProps> = ({ children }) => {
    const [active,setActive] = useState('')
    
    return (
        <ActiveSectionContext.Provider value={{active,setActive}}>
            {children}
        </ActiveSectionContext.Provider>
    )
}
