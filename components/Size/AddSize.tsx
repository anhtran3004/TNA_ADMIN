import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertSize} from "@/lib/API/Size";
interface Props {
    setStatusSize: Dispatch<SetStateAction<number>>
    setIsOpenAddProduct: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
}
export default function AddSize(props: Props) {
    const [valueSize, setValueSize] = useState("");

    async function InsertSize() {
        if(valueSize === ''){
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await insertSize(valueSize);
            if(res.code === 200){
                console.log('updated success!');
                props.setStatusSize(randomNumberInRange(1,1000));
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
                <div className="update-Size">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Insert Size:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Size:</label>
                        <input
                            className="shadow-gray-400 border-2"

                            type="text"
                            id="priority"
                            name="priority"
                            value={valueSize}
                            onChange={(e) => setValueSize(e.target.value)}
                        />
                    </div>
                    <button onClick={InsertSize}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">Insert Size
                    </button>
                </div>
            </div>
        </div>

    </>
}