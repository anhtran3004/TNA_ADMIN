import {GetARBaseUrl} from "@/lib/API";

export async function changeStatus(id: number, status: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/change-status/"+id;
        const fetchData = {
            method: 'PUT',
            headers:{
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
export async function getOrder(status: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/";
        const fetchData = {
            method: 'POST',
            headers:{
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
export async function getOrderProduct(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/order-product/"+id;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}