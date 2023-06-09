import process from "process";
import {GetUserAuthentication} from "@/lib/API/User";

function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
export async function deleteSize(id: number){
    try{
        const url_deleteSize = GetARBaseUrl() + "/api/v1/size/delete-sizes/" + id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_deleteSize, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateSize(Size: string, SizeId: number){
    try{
        const url_updateSizes = GetARBaseUrl() + "/api/v1/size/update-size/" + SizeId;
        const body = {size: Size}
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_updateSizes, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertSize(size: string){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/size/insert-size/";
        const body = {size: size}
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_updateColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}