import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {insertColor, updateColor} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
interface Props {
    setStatusColor: Dispatch<SetStateAction<number>>
    setIsOpenAddProduct: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
}
export default function AddColor(props: Props) {
    const [valueColor, setValueColor] = useState("");

    async function InsertColor() {
        if(valueColor === ''){
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await insertColor(valueColor);
            if(res.code === 200){
                console.log('updated success!');
                props.setStatusColor(randomNumberInRange(1,1000));
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
                <div className="update-color">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Thêm màu sắc:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Màu sắc:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="priority"
                            name="priority"
                            value={valueColor}
                            onChange={(e) => setValueColor(e.target.value)}
                        />
                    </div>
                    <button onClick={InsertColor}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">
                        <i className="fa-sharp fa-solid fa-plus" style={{marginRight: "10px"}}></i>
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>

    </>
}