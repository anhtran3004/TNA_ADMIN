import {GetARBaseUrl} from "@/lib/API";
import {InputBlockUser, InputInsertUser, InputUpdateUser, InputUser} from "@/components/HomeType";
export function GetUserAuthentication(){
    if(localStorage.getItem('accessTokenAdmin') !== undefined){
        return localStorage.getItem('accessTokenAdmin');
    }
    return '';
}
export async function getUser(input: InputUser){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/user/";
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
export async function getUsername(){
    try{
        const url_getUser = GetARBaseUrl() + "/api/v1/user/get-username/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getUser, fetchData);
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
