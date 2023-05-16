import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputCategory} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertCategory} from "@/lib/API/Category";
import {changeStatus, updateReasonOrder} from "@/lib/API/Order";
interface Props {
    setIsOpenReason: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
    changeStatus: (id: number, status: number) => void
    orderId: number
}
export default function ReasonRemove(props: Props) {
    const [valueReason, setValueReason] = useState('')
    const [error, setError] = useState(false)
    async function UpdateReasonOrder(){
        if(valueReason === ''){
            setError(true);
            return;
        }
        try{
            const res = await updateReasonOrder(props.orderId, valueReason);
            if(res.code === 200){
                console.log('add reason success!');
                props.changeStatus(props.orderId, 3);
                props.setIsOpenReason(false)
            }
        }catch (e) {
            console.log('error', e)
        }
    }
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenReason(false)}></div>
            <div className="inner-error-modal" style={{width: "500px"}}>
                <div className="update-category">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Lý do hủy đơn:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Lý do hủy đơn:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="priority"
                            name="priority"
                            value={valueReason}
                            onChange={(e) => {setValueReason(e.target.value); setError(false)}}
                        />
                    </div>
                    {error && <div style={{color:"red", marginTop:"0", marginBottom:"5px"}}>Hãy nhập vào lý do</div>}


                    <button onClick={() => props.setIsOpenReason(false)}
                            className="rounded-md bg-white text-black p-2 mr-2 mt-2 ml-0 border-solid border-2 border-black ">Hủy bỏ
                    </button>
                    <button onClick={() => {UpdateReasonOrder().then()}}
                            className="rounded-md bg-red-600 text-white p-2 mr-2 mt-2 ml-0">Xác nhận
                    </button>
                </div>
            </div>
        </div>

    </>
}