import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputCategory} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertCategory} from "@/lib/API/Category";
interface Props {
    setStatusCategory: Dispatch<SetStateAction<number>>
    setIsOpenAddProduct: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
}
export default function AddCategory(props: Props) {
    const [valueCategory, setValueCategory] = useState("");
    function DefaultInputCategoryData(): InputCategory{
        const data ={
            category_input: {
                name: valueCategory,
                status: 1
            }
        }
        return data;
    }
    async function InsertCategory() {
        if(valueCategory === ''){
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await insertCategory(DefaultInputCategoryData());
            if(res.code === 200){
                console.log('updated success!');
                props.setStatusCategory(randomNumberInRange(1,1000));
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
                <div className="update-category">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Thêm mới danh mục:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Danh mục:</label>
                        <input
                            className="shadow-gray-400 border-2"

                            type="text"
                            id="priority"
                            name="priority"
                            value={valueCategory}
                            onChange={(e) => setValueCategory(e.target.value)}
                        />
                    </div>
                    <button onClick={InsertCategory}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">Thêm mới
                    </button>
                </div>
            </div>
        </div>

    </>
}