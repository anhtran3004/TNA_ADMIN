import process from "process";
import {InputLogin} from "@/components/HomeType";

export async function login(input: InputLogin){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    try{
        const url_login = urls + "/api/v1/user/login-admin";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_login, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}