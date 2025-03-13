export default interface UserProfile {
    _id:string,
    username:string,
    email:string,
    role:"User" | "Admin",
    confirmPassword:string,
    phone?:string,
    createdAt?:string,
    updatedAt?:string
}