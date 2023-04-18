import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {Campaign,} from "@/components/HomeType";
import {getListCampaign} from "@/lib/API";


import {useRouter} from "next/router";
import {GetDefaultCampaign} from "@/pages/product-detail";
import {ContentCampaign} from "@/components/Campaign/ContentCampain";
import {UploadImageCampaign} from "@/components/Campaign/UploadImageCampain";
import {UpdateCampaign} from "@/components/Campaign/UpdateCampaign";
import {HeaderTableCampaign} from "@/components/Campaign/HeaderTableCampaign";
import Modal from "@/components/Alert/Modal";
import AddCampaign from "@/components/Campaign/AddCampaign";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";

// import storage = firebase.storage;

export default function Campaign() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [campaignActive, setCampaignActive] = useState<Campaign>(GetDefaultCampaign());
    const [campaignSelected, setCampaignSelected] = useState<number>(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [statusInsert, setStatusInsert] = useState(-1);
    const [isOpenAddCampaign, setIsOpenAddCampaign] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const router = useRouter();

    function nextAddcampaign() {
        router.push("/add-campaign").then();
    }

    useEffect(() => {

        async function fetchcampaignData() {
            try {
                const res = await getListCampaign()
                const status = res.code;
                if (status === 200) {
                    setCampaigns(res.data);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchcampaignData().then();
    }, [statusUpdate, statusInsert])
    useEffect(() => {
        async function getCampaignSelected() {
            for (let i = 0; i < campaigns.length; i++) {
                if (campaigns[i].id === campaignSelected) {
                    setCampaignActive(campaigns[i]);
                }
            }
        }

        getCampaignSelected().then();
    }, [campaignSelected])
    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                     onClick={() => setIsOpenAddCampaign(true)}>Add New campaign
                </div>
            </div>
            <div className="flex justify-evenly">
                <table border={1}>
                    <HeaderTableCampaign/>
                    <tbody>
                    {campaigns.map((campaign, index) => (
                        <ContentCampaign key={campaign.id} onClick={() => setCampaignSelected(campaign.id)}
                                         index={index}
                                         campaignSelected={campaignSelected} campaign={campaign} id={campaign.id}
                                         setStatusCampaign={setStatusUpdate}/>
                    ))}
                    </tbody>
                </table>
                <UploadImageCampaign campaignActive={campaignActive} setStatusUpdate={setStatusUpdate}/>
            </div>
            <UpdateCampaign campaignActive={campaignActive} setStatusUpdate={setStatusUpdate}/>
        </Layout>
        {isOpenAddCampaign && (
            <Modal>
                <AddCampaign setIsOpenAddCampaign={setIsOpenAddCampaign} setStatusInsert={setStatusInsert}
                             setIsOpenError={setIsOpenError}
                             setTextError={setTextErrors} setIsOpenSuccess={setIsOpenSuccess}
                             setTextSuccess={setTextSuccess}
                />
            </Modal>
        )}
        {isOpenSuccess && (
            <Modal>
                <Success textSuccess={textSuccess}/>
            </Modal>
        )}
        {isOpenError && (
            <Modal>
                <Errors textError={textErrors}/>
            </Modal>
        )}
    </>;
}