import {GetARBaseUrl} from "@/lib/API";
import {InputBlockUser, InputCategory} from "@/components/HomeType";
import {GetUserAuthentication} from "@/lib/API/User";


export async function deleteCategory(id: number){
    try{
        const url_deleteCategory = GetARBaseUrl() + "/api/v1/category/delete-categories/"+ id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST'
        }
        const response = await fetch(url_deleteCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteProductFollowCategory(status: number, categoryId: number){
    try{
        const url_deleteCategory = GetARBaseUrl() + "/api/v1/product/delete-product-follow-category/"+ categoryId;
        const body = {status: status}
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateCategory(input: InputCategory, id: number){
    try{
        const url_updateCategory = GetARBaseUrl() + "/api/v1/category/update-category/"+ id;
        const fetchData = {
            method: 'PUT',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_updateCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertCategory(input: InputCategory){
    try{
        const url_insertCategory = GetARBaseUrl() + "/api/v1/category/insert-category/";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}