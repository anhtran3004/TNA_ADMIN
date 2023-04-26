import {GetARBaseUrl} from "@/lib/API";
import {GetUserAuthentication} from "@/lib/API/User";

export async function getContact(){
    try{
        const url_getContact = GetARBaseUrl() + "/api/v1/contact/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getContact, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteContact(id: number){
    try{
        const url_deleteContact = GetARBaseUrl() + "/api/v1/contact/delete-contact/"+ id;
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
        }
        const response = await fetch(url_deleteContact, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}