import process from "process";

function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
export async function getListSize(){
    try{
        const url_getListSizes = GetARBaseUrl() + "/api/v1/size/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListSizes, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteSize(ids: number[]){
    try{
        const url_deleteSize = GetARBaseUrl() + "/api/v1/size/delete-Size";
        const body = {ids: ids}
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteSize, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateSize(Size: string, SizeId: number){
    try{
        const url_updateSizes = GetARBaseUrl() + "/api/v1/size/update-Size/" + SizeId;
        const body = {Size: Size}
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_updateSizes, fetchData);
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