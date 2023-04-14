import process from "process";
import {InputDeleteProduct, InputInventory, InputProduct, InputUpdateProduct} from "@/components/HomeType";

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
export async function deleteProduct(ids: number[]){
    try{
        const url_deleteProduct = GetARBaseUrl() + "/api/v1/product/delete-product";
        const body = {ids: ids}
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateProduct(input: InputUpdateProduct, id: number){
    try{
        const url_updateProduct = GetARBaseUrl() + "/api/v1/product/edit-product/"+ id;
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_updateProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertProduct(input: InputUpdateProduct){
    try{
        const url_insertProduct = GetARBaseUrl() + "/api/v1/product/insert-product";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertInventory(input: InputInventory, productId: number){
    try{
        const url_insertProduct = GetARBaseUrl() + "/api/v1/product/insert-quantity-of-inventory/"+ productId;
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateInventory(input: InputInventory, productId: number){
    try{
        const url_insertProduct = GetARBaseUrl() + "/api/v1/product/update-quantity-of-inventory/"+ productId;
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertProduct, fetchData);
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
export async function getListColor(){
    try{
        const url_getListColors = GetARBaseUrl() + "/api/v1/color/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListSize(){
    try{
        const url_getListColors = GetARBaseUrl() + "/api/v1/size/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListColors, fetchData);
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
export async function getInventory(productId: number){
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
export async function getInventories(productId: string | string[] | undefined){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-quantity-of-inventory/" + productId;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}