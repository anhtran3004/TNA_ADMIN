import {GetARBaseUrl} from "@/lib/API";
import {InputCampaign} from "@/components/HomeType";


export async function deleteCampaign(ids: number[]){
    try{
        const url_deleteCampaign = GetARBaseUrl() + "/api/v1/campaign/delete-campaign";
        const body = {ids: ids}
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateCampaign(input: InputCampaign, id: number){
    try{
        const url_updateCampaign = GetARBaseUrl() + "/api/v1/campaign/update-campaign/"+ id;
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_updateCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertCampaign(input: InputCampaign){
    try{
        const url_insertCampaign = GetARBaseUrl() + "/api/v1/campaign/insert-campaign/";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}