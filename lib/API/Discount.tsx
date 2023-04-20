import {GetARBaseUrl} from "@/lib/API";
import {InputDiscount} from "@/components/HomeType";
// import {InputDiscount} from "@/components/HomeType";


export async function deleteDiscount(ids: number[]){
    try{
        const url_deleteDiscount = GetARBaseUrl() + "/api/v1/discount/delete-discount";
        const body = {ids: ids}
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateDiscount(input: InputDiscount, id: number){
    try{
        const url_updateDiscount = GetARBaseUrl() + "/api/v1/discount/update-discount/"+ id;
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_updateDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertDiscount(input: InputDiscount){
    try{
        const url_insertDiscount = GetARBaseUrl() + "/api/v1/discount/insert-discount/";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}