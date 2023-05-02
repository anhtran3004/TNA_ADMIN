import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputChildComment} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertComment} from "@/lib/API/Comment";
interface Props {
    setStatusComment: Dispatch<SetStateAction<number>>
    setIsOpenAddProduct: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
    commentId: number
}
export default function AddComment(props: Props) {
    const [valueComment, setValueComment] = useState("");
    function DefaultDataInputChildComment(): InputChildComment{
        const data = {
            comment_input: {
                content: valueComment,
                comment_id: props.commentId
            }
        }
        return data;
    }
    async function InsertComment() {
        try{
            const res = await insertComment(DefaultDataInputChildComment());
            if(res.code === 200){
                console.log('updated success!');
                props.setStatusComment(randomNumberInRange(1,1000));
                props.setIsOpenAddProduct(false);
                props.setTextSuccess("Insert Success!")
                props.setIsOpenSuccess(true);
                setTimeout(() =>props.setIsOpenSuccess(false), 2000)
            }else {
                props.setIsOpenAddProduct(false);
                props.setTextError("Insert Errors!")
                props.setIsOpenError(true);
                setTimeout(() =>props.setIsOpenError(false), 2000)
            }

        }catch (e){
            console.log('error');
            props.setIsOpenAddProduct(false);
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
        }

    }
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenAddProduct(false)}></div>
            <div className="inner-error-modal" style={{width: "500px"}}>
                <div className="update-comment">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Insert comment:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Comment:</label>
                        <textarea
                            style={{height: "133px"}}
                            className="shadow-gray-400 border-2 w-200 ml-1"
                            type="text"
                            id="priority"
                            name="priority"
                            value={valueComment}
                            onChange={(e) => setValueComment(e.target.value)}
                        />
                    </div>
                    <button onClick={InsertComment}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">Reply comment
                    </button>
                </div>
            </div>
        </div>

    </>
}