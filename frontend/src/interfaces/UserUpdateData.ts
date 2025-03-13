export default interface UserUpdateData {
    _id:string,
    username?:string,
    email?:string,
    oldPassword?:string,
    newPassword?:string,
    confirmPassword?:string,
    phone?:string,
}