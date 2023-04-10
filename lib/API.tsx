import process from "process";

function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://63b6-118-69-7-52.ngrok-free.app";
    return url
}
export async function getListProduct(filter){
    try{
        let headers = new Headers();
        const url_getListProduct = GetARBaseUrl() + "/api/v1/product/";
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        // // headers.append('Access-Control-Allow-Credentials', 'true');
        // headers.append('Access-Control-Request-Headers', 'Content-Type');
        const fetchData = {
            // headers: headers,
            method: 'POST',
            body: filter
            // credentials: 'include'
            // mode: 'cors'
        }
        const response = await fetch(url_getListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}