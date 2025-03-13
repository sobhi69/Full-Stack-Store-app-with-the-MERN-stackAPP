import { useContext } from "react"
import { ActiveSectionContext } from "../context/ActiveSectionContext"

export default function useActiveSection () {
    const activeSectionContext = useContext(ActiveSectionContext)

    if (!activeSectionContext) {
        throw new Error('useActiveSection mush be used within the ActiveSectionProvider')
    }

    return activeSectionContext
}