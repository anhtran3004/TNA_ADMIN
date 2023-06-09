import {GetARBaseUrl} from "@/lib/API";
import {GetUserAuthentication} from "@/lib/API/User";

export async function getNewUserFollowDay(year: number, month: number, day: number){
    try{
        const url_getNewUser = GetARBaseUrl() + "/api/v1/statistical/get-new-users-follow-day/";
        const body = {year: year, month: month, day: day}
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getNewUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getNewUserFollowMonth(year: number, month: number){
    try{
        const url_getNewUser = GetARBaseUrl() + "/api/v1/statistical/get-new-users-follow-month/";
        const body = {year: year, month: month}
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getNewUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getNewUserFollowYear(year: number){
    try{
        const url_getNewUser = GetARBaseUrl() + "/api/v1/statistical/get-new-users-follow-year/";
        const body = {year: year}
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getNewUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListCreatedDate(){
    try{
        const url_listDate = GetARBaseUrl() + "/api/v1/statistical/date/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
        }
        const response = await fetch(url_listDate, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}

export async function getListCreatedMonth(){
    try{
        const url_listDate = GetARBaseUrl() + "/api/v1/statistical/month/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
        }
        const response = await fetch(url_listDate, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}

export async function getListCreatedYear(){
    try{
        const url_listDate = GetARBaseUrl() + "/api/v1/statistical/year/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
        }
        const response = await fetch(url_listDate, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}

export async function getHotListProduct(){
    try{
        const url_hotListProduct = GetARBaseUrl() + "/api/v1/statistical/get-hot-product-list/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + GetUserAuthentication(),
            },
            method: 'POST',
        }
        const response = await fetch(url_hotListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}