// import {campaign} from "@/components/HomeType";
import Link from "next/link";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {Campaign} from "@/components/HomeType";
import {deleteCampaign} from "@/lib/API/Campaign";
interface Props{
    onClick: () => void,
    campaignSelected: number,
    campaign: Campaign,
    id: number,
    index: number
    setStatusCampaign: Dispatch<SetStateAction<number>>
}
export function formatDate(date:string){
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}
export function ContentCampaign(props: Props) {
    const textError = "Bạn có chắc chắn muốn xóa sản phẩm này không?";
    const [isOpenDeleteCampaignAlert, setIsOpenDeleteCampaignAlert] = useState(false);
    async function DeleteCampaign() {
        try{
            const res = await deleteCampaign([props.id]);
            if(res.code === 200){
                console.log('deleted success!');
                props.setStatusCampaign(props.id);
            }
        }catch (e){
            console.log('error');
        }

    }
    return<>
        <tr onClick={props.onClick}
            className={(props.campaignSelected === props.campaign.id) ? "selected-product" : ""}>
            <td>{props.index + 1}</td>
            <td>{props.campaign.name}</td>
            <td>
                <div
                    dangerouslySetInnerHTML={{__html: props.campaign.campaign_description}}
                />
            </td>
            <td>{formatDate(props.campaign.start_day)}</td>
            <td>{formatDate(props.campaign.end_day)}</td>
            <td className="flex w-30  items-center border-none justify-evenly">
                <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => setIsOpenDeleteCampaignAlert(true)}>
                    <i className="fa-solid fa-trash-can" style={{marginRight:"10px"}}></i>
                    Xóa
                </button>
            </td>
        </tr>
        {isOpenDeleteCampaignAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteCampaignAlert}
                               setOkListener={DeleteCampaign}/>
            </Modal>
        )}
    </>
}