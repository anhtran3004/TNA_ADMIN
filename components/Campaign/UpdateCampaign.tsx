import {Campaign, InputCampaign} from "@/components/HomeType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getListCampaign,} from "@/lib/API";
import {GetDefaultCampaign} from "@/pages/product-detail";
import {updateCampaign} from "@/lib/API/Campaign";
import {formatDate} from "@/components/Campaign/ContentCampain";

const _ = require('lodash');

interface Props {
    campaignActive: Campaign,
    setStatusUpdate: Dispatch<SetStateAction<number>>
}

export function randomNumberInRange(min: number, max: number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function UpdateCampaign(props: Props) {

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [valueName, setValueName] = useState<string>(props.campaignActive.name);
    const [valueEndDay, setValueEndDay] = useState<string>(props.campaignActive.end_day);
    const [valueDesc, setValueDesc] = useState<string>(props.campaignActive.campaign_description);
    const [campaign, setCampaign] = useState<Campaign>(GetDefaultCampaign())
    useEffect(() => {
        async function fetchCampaign() {
            try {
                const res = await getListCampaign();
                if (res.code === 200) {
                    setCampaigns(res.data);
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].id === props.campaignActive.id) {
                            setCampaign(res.data[i]);
                        }
                    }
                }
            } catch (e) {
                console.log('error');
            }
        }


        fetchCampaign().then();
    }, [props.campaignActive.id])
    useEffect(() => {

        setValueName(props.campaignActive.name);
        setValueEndDay(formatDate(props.campaignActive.end_day))
        setValueDesc(props.campaignActive.campaign_description)
    }, [campaign])

    function inputUpdate(): InputCampaign {
        const data = {
            campaign_input: {
                name: valueName,
                thumb: props.campaignActive.thumb,
                end_day: valueEndDay,
                campaign_description: valueDesc
            }
        }
        return data;
    }

    async function Updatecampaign() {
        try {
            console.log("id", inputUpdate());
            const res = await updateCampaign(inputUpdate(), props.campaignActive.id);
            if (res.code === 200) {
                console.log('update success!');
                props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        } catch (e) {
            console.log('error');
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Updatecampaign().then();
        // console.log("campaign data: ", props.campaignActive);
        // TODO: submit campaign data to backend or perform other actions
    };
    return <div className="mb-10 ml-8">
        <p className="font-bold ml-5 mb-3">CẬP NHẬT THÔNG TIN CHIẾN DỊCH</p>
        <form onSubmit={handleSubmit} className="update-campaign-detail">
            <div>
                <div className="input-product">
                    <label htmlFor="name">Tên chiến dịch:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={valueName}
                        onChange={(e) => setValueName(e.target.value)}

                    />
                </div>
                <div className="input-product">
                    <label htmlFor="price">Ngày kết thúc:</label>
                    <input
                        type="date"
                        id="price"
                        name="price"
                        value={valueEndDay}
                        onChange={(e) => setValueEndDay(e.target.value)}
                    />
                </div>
                <div className="input-product">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={valueDesc}
                        onChange={(e) => setValueDesc(e.target.value)}
                    />
                </div>
                <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Campaign
                </button>
            </div>
        </form>
    </div>
}