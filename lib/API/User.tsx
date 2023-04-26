import {GetARBaseUrl} from "@/lib/API";
import {InputBlockUser, InputInsertUser, InputUpdateUser} from "@/components/HomeType";
export function GetUserAuthentication(){
    if(localStorage.getItem('accessToken') !== undefined){
        return localStorage.getItem('accessToken');
    }
    return '';
}
export async function getUser(){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/user/";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertUser(input: InputInsertUser){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/user/insert-user-by-admin";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateUser(id: number, input: InputUpdateUser){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/user/update-user-by-admin/" + id;
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function blockUser(input: InputBlockUser){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/user/delete-user/";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
