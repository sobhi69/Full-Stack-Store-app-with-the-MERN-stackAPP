export const matchsKeySearch = (title: string, keySearch: string): boolean => {
    if (title.toLocaleLowerCase().trim().includes(keySearch.toLocaleLowerCase().trim())) {
        return true
    } else {
        return false
    }
}