import process from "process";

export async function forgotPassword(email: string){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    const body = { email: email}
    try{
        const url_login = urls + "/api/v1/forgot-password/";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_login, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function verifyOtp(email: string, otp: string){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    const body = { email: email, code: otp}
    try{
        const url_verifyOtp = urls + "/api/v1/forgot-password/verify-otp";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_verifyOtp, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function resetPassword(email: string, password: string){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    const body = { email: email, password: password}
    try{
        const url_verifyOtp = urls + "/api/v1/forgot-password/reset-password";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_verifyOtp, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}