import process from "process";
import {InputInventory, InputProduct} from "@/components/HomeType";

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
export async function getListCampaign(){
    try{
        const url_getListCampaign = GetARBaseUrl() + "/api/v1/campaign/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListDiscount(){
    try{
        const url_getListDiscount = GetARBaseUrl() + "/api/v1/discount/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getInventory(productId: InputInventory){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-quantity-of-inventory";
        const fetchData = {
            method: 'POST',
            body: JSON.stringify(productId)
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getInventories(productId: number){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-quantity-of-inventory";
        const body = {
            product_id: 1
        }
        const fetchData = {
            method: 'POST',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}