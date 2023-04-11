import process from "process";
import {InputProduct} from "@/components/HomeType";

function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
export async function getListProduct(filter: InputProduct){
    try{
        const url_getListProduct = GetARBaseUrl() + "/api/v1/product/";
        const fetchData = {
            method: 'POST',
            body: JSON.stringify(filter)
        }
        const response = await fetch(url_getListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListCategory(){
    try{
        const url_getListCategory = GetARBaseUrl() + "/api/v1/category/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}