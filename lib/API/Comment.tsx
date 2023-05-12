import {GetARBaseUrl} from "@/lib/API";
import {InputChildComment,InputCommentFilter} from "@/components/HomeType";
import {GetUserAuthentication} from "@/lib/API/User";

export async function getComment(inputComment: InputCommentFilter){
    try{
        const url_deleteComment = GetARBaseUrl() + "/api/v1/comment/get-comment-with-filter";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(inputComment)
        }
        const response = await fetch(url_deleteComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getCommentProduct(){
    try{
        const url_deleteComment = GetARBaseUrl() + "/api/v1/comment/get-product-comment";
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_deleteComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getChildComment(id: number){
    try{
        // const body = {comment_id: id}
        const url_deleteComment = GetARBaseUrl() + "/api/v1/comment/get-child-comments/"+ id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
            // body: JSON.stringify(body)
        }
        const response = await fetch(url_deleteComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteChildComment(id: number){
    try{
        const url_deleteComment = GetARBaseUrl() + "/api/v1/comment/delete-child-comment/" + id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_deleteComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteComment(id: number){
    try{
        const url_deleteComment = GetARBaseUrl() + "/api/v1/comment/delete-comment/" + id;
        const fetchData = {
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_deleteComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}

export async function insertComment(input: InputChildComment){
    try{
        const url_insertComment = GetARBaseUrl() + "/api/v1/comment/reply-comment/";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertComment, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}