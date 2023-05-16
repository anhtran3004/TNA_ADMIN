import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputCategory} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertCategory} from "@/lib/API/Category";
import {changeStatus, getReason, updateReasonOrder} from "@/lib/API/Order";
interface Props {
    setIsOpenReason: Dispatch<SetStateAction<boolean>>
    orderId: number
}
export default function ViewReasonRemove(props: Props) {
    const [reason, setReason] = useState('')
    async function GetReason(){
        try{
            const res = await getReason(props.orderId)
            if(res.code == 200){
                setReason(res.data[0].reason_remove);
                console.log('success!', res.data[0].reason_remove);
            }
        }catch (e){
            console.log('error', e)
        }
    }
    useEffect(() => {
        GetReason().then();
    }, [])
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenReason(false)}></div>
            <div className="inner-reason-modal" style={{width: "500px"}}>
                <div>
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Lý do hủy đơn:</h2>
                    <p style={{fontSize: "20px"}}>{reason}</p>
                    <button onClick={() => props.setIsOpenReason(false)}
                            className="rounded-md bg-red-600 text-white p-2 mr-2 mt-2 ml-0">Đóng
                    </button>
                </div>
            </div>
        </div>

    </>
}