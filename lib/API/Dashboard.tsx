import {GetARBaseUrl} from "@/lib/API";

export async function getRevenueFollowYear(year: number){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/calculate-revenue-follow-year/";
        const body = {year: year}
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

export async function getRevenueFollowMonth(year: number, month: number){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/calculate-revenue-follow-month/";
        const body = {year: year, month: month}
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
export async function getRevenueFollowWeek(startDay: string, endDay: string){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/calculate-revenue-follow-week/";
        const body = {startDay: startDay, endDay: endDay}
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
export async function getRevenueFollowDay(year: number, month: number, day: number){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/calculate-revenue-follow-day/";
        const body = {year: year, month: month, day: day}
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
export async function getListYear(){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/year/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_updateColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListMonth(){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/month/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_updateColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListDate(){
    try{
        const url_updateColors = GetARBaseUrl() + "/api/v1/dashboard/date/";
        const fetchData = {
            headers:{
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_updateColors, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}