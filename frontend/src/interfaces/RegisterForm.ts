export default interface RegisterForm {
    username:string,
    email:string,
    password:string,
    role:"User" | "Admin",
    confirmPassword:string,
    phone?:string
}