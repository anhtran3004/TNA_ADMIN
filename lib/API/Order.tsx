import {GetARBaseUrl} from "@/lib/API";
import {GetUserAuthentication} from "@/lib/API/User";
import {InputOrderFilter} from "@/components/HomeType";

export async function changeStatus(id: number, status: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/change-status/"+id;
        const fetchData = {
            method: 'PUT',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateShippedDate(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/update-order-product/"+id;
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}

export async function getOrder(inputOrder: InputOrderFilter){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/get-order";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(inputOrder)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getOrderProduct(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/order-product/"+id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}