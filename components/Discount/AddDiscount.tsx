import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {insertColor, updateColor} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputDiscount} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertDiscount} from "@/lib/API/Discount";
import {GetDefaultDiscount} from "@/pages/product-detail";
import {formatDates} from "@/components/Campaign/UploadImageCampain";
interface Props {
    setStatusInsert: Dispatch<SetStateAction<number>>
    setIsOpenAddDiscount: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
}

export default function AddDiscount(props: Props) {
    const [valueDiscountCode, setValueDiscountCode] = useState("");
    const [valueDiscount, setValueDiscount] = useState(0);
    const [valueDiscountType, setValueDiscountType] = useState("");
    const [valueEndDay, setValueEndDay] = useState("");

    function inputInsert(): InputDiscount {
        const data = {
            discount_input: {
                discount_code: Math.random().toString(36).substring(2, 10),
                discount_type: valueDiscountType,
                discount_value: valueDiscount,
                end_day: formatDates(valueEndDay),
            }
        }
        return data;
    }
    async function InsertDiscount() {
        if(isNaN(valueDiscount) || valueDiscountType === '' || valueEndDay === ''){
            props.setTextError("Insert Error!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await insertDiscount(inputInsert());
            if(res.code === 200){
                props.setStatusInsert(randomNumberInRange(1,1000));
                props.setIsOpenAddDiscount(false);
                props.setTextSuccess("Insert Success!")
                props.setIsOpenSuccess(true);
                setTimeout(() =>props.setIsOpenSuccess(false), 2000)
            }else {
                props.setIsOpenAddDiscount(false);
                props.setTextError("Insert Errors!")
                props.setIsOpenError(true);
                setTimeout(() =>props.setIsOpenError(false), 2000)
            }

        }catch (e){
            console.log('error');
            props.setIsOpenAddDiscount(false);
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
        }

    }
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenAddDiscount(false)}></div>
            <div className="inner-error-modal" style={{width: "600px", height:"400px",left: "calc(50% - 600px/2 + 0.5px)",
                top: "calc(50% - 400px/2)" }}>
                <div className="update-color">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Insert color:</h2>
                    <div className="input-product" style={{width:"500px"}}>
                        <label htmlFor="name">Giá trị:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="number"
                            id="name"
                            name="name"
                            value={valueDiscount}
                            onChange={(e) => setValueDiscount(parseFloat(e.target.value))}

                        />
                    </div>
                    <div className="input-product" style={{width:"500px"}}>
                        <label htmlFor="price">Loại:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="price"
                            name="price"
                            value={valueDiscountType}
                            onChange={(e) => setValueDiscountType(e.target.value)}
                        />
                    </div>
                    <div className="input-product" style={{width:"500px"}}>
                        <label htmlFor="price">Ngày kết thúc:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="date"
                            id="price"
                            name="price"
                            value={valueEndDay}
                            onChange={(e) => setValueEndDay(e.target.value)}
                        />
                    </div>

                    <button onClick={InsertDiscount}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">Cập nhật
                    </button>
                </div>
            </div>
        </div>

    </>
}