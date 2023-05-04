import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {insertColor, updateColor} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Discount, InputCampaign} from "@/components/HomeType";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import {insertCampaign} from "@/lib/API/Campaign";
import {GetDefaultCampaign} from "@/pages/product-detail";
interface Props {
    setStatusInsert: Dispatch<SetStateAction<number>>
    setIsOpenAddCampaign: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
}

export default function AddCampaign(props: Props) {
    const [valueName, setValueName] = useState("");
    const [valueEndDay, setValueEndDay] = useState("");
    const [valueDesc, setValueDesc] = useState("");
    function inputInsert(): InputCampaign {
        const data = {
            campaign_input: {
                name: valueName,
                thumb: '/',
                end_day: valueEndDay,
                campaign_description: valueDesc
            }
        }
        return data;
    }
    async function InsertCampaign() {
        try{
            const res = await insertCampaign(inputInsert());
            if(res.code === 200){
                props.setStatusInsert(randomNumberInRange(1,1000));
                props.setIsOpenAddCampaign(false);
                props.setTextSuccess("Insert Success!")
                props.setIsOpenSuccess(true);
                setTimeout(() =>props.setIsOpenSuccess(false), 2000)
            }else {
                props.setIsOpenAddCampaign(false);
                props.setTextError("Insert Errors!")
                props.setIsOpenError(true);
                setTimeout(() =>props.setIsOpenError(false), 2000)
            }

        }catch (e){
            console.log('error');
            props.setIsOpenAddCampaign(false);
            props.setTextError("Insert Errors!")
            props.setIsOpenError(true);
            setTimeout(() =>props.setIsOpenError(false), 2000)
        }

    }
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenAddCampaign(false)}></div>
            <div className="inner-error-modal" style={{width: "600px", height:"400px",left: "calc(50% - 600px/2 + 0.5px)",
                top: "calc(50% - 400px/2)" }}>
                <div className="update-color">
                    <h2 className=" font-bold text-2xl ml-0 mb-2">Insert color:</h2>
                    <div className="input-product" style={{width:"500px"}}>
                        <label htmlFor="name">Tên chiến dịch:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="name"
                            name="name"
                            value={valueName}
                            onChange={(e) => setValueName(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <div className="input-product" style={{width:"500px"}}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            className="shadow-gray-400 border-2"
                            id="description"
                            name="description"
                            value={valueDesc}
                            onChange={(e) => setValueDesc(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={InsertCampaign}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-0">Insert Campaign
                    </button>
                </div>
            </div>
        </div>

    </>
}