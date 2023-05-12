import process from "process";
import {
    InputBlockProduct,
    InputCampaignFilter, InputColorFilter,
    InputDeleteProduct, InputDiscount, InputDiscountFilter,
    InputInventory,
    InputProduct, InputSizeFilter,
    InputUpdateProduct
} from "@/components/HomeType";
import {GetUserAuthentication} from "@/lib/API/User";

export function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
export async function getListProduct(filter: InputProduct){
    try{
        const url_getListProduct = GetARBaseUrl() + "/api/v1/product/get-product-admin";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(filter)
        }
        const response = await fetch(url_getListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteProduct(inputProduct: InputBlockProduct){
    try{
        const url_deleteProduct = GetARBaseUrl() + "/api/v1/product/delete-products";
        const fetchData = {
            method: 'PUT',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputProduct)
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
                Authorization: "Bearer " + GetUserAuthentication(),
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
                Authorization: "Bearer " + GetUserAuthentication(),
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
                Authorization: "Bearer " + GetUserAuthentication(),
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
                Authorization: "Bearer " + GetUserAuthentication(),
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
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_getListCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListColor(inputColor: InputColorFilter){
    try{
        const url_getListColors = GetARBaseUrl() + "/api/v1/color/get-color-with-filter";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputColor)
        }
        const response = await fetch(url_getListColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteColor(id: number){
    try{
        const url_deleteColor = GetARBaseUrl() + "/api/v1/color/delete-colors/" + id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_deleteColor, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateColor(color: string, colorId: number){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/color/update-color/" + colorId;
        const body = {color: color}
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_updateColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertColor(color: string){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/color/insert-color/";
        const body = {color: color}
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

export async function getListSize(inputSize: InputSizeFilter){
    try{
        const url_getListColors = GetARBaseUrl() + "/api/v1/size/get-size-with-filter";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputSize)
        }
        const response = await fetch(url_getListColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListCampaign(inputCampaign: InputCampaignFilter){
    try{
        const url_getListCampaign = GetARBaseUrl() + "/api/v1/campaign/get-admin";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputCampaign)
        }
        const response = await fetch(url_getListCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListDiscount(inputDiscount: InputDiscountFilter){
    try{
        const url_getListDiscount = GetARBaseUrl() + "/api/v1/discount/get-discount";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputDiscount)
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
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
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
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}