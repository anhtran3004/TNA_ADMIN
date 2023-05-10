import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {Campaign, InputCampaignFilter,} from "@/components/HomeType";
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
import {formatDate} from "@/pages/user";
const _ = require('lodash');

// import storage = firebase.storage;
export function dataInputCampaign() : InputCampaignFilter{
    const data ={
        filter: {
            search: '',
            start_day: {
                min: '2023-01-01',
                max: '2050-01-01'
            }
        },
        sort:{
            field: 'start_day',
            order: 'DESC'
        }
    }
    return data;
}
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
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [valueSearch, setValueSearch] = useState('');
    const [filterCampaign, setFilterCampaign] = useState<InputCampaignFilter>(dataInputCampaign())
    const inputListeners = () => {
        console.log(valueSearch, valueMinImportDate);
        const tempFilter = _.cloneDeep(filterCampaign);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.start_day.min =  valueMinImportDate;
        tempFilter.filter.start_day.max = valueMaxImportDate;
        setFilterCampaign(tempFilter);
    }
    useEffect(() => {
        async function fetchCampaignData() {
            try {
                const res = await getListCampaign(filterCampaign);
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

        fetchCampaignData().then();
    }, [statusUpdate, statusInsert, filterCampaign])
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
            <div className="header-product">
                <div className="rounded-md bg-violet-700 text-white" style={{width: "100px",height:"50px",lineHeight:"50px", textAlign: "center", margin: "20px", marginLeft: "55px", fontSize:"20px"}}
                     onClick={() => setIsOpenAddCampaign(true)}>Thêm mới
                </div>
                <div className="price-filter" style={{marginTop: "7px"}}>
                    <p>Ngày tạo:</p>
                    <div className="d-flex form-price">
                        <div className="mr-3">
                            <label>Từ:</label>
                            <input style={{width:"150px"}} type="date" value={formatDate(valueMinImportDate)} onChange={(e) => setValueMinImportDate(e.target.value)}/>
                        </div>
                        <div>
                            <label>Đến:</label>
                            <input style={{width:"150px"}} type="date" value={formatDate(valueMaxImportDate)} onChange={(e) => setValueMaxImportDate(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="search-form">
                    <input type="text" name="search"
                           style={{border: "1px solid gray", borderRadius: "16px", padding: "10px"}}
                           placeholder="Search..."
                           value={valueSearch}
                           onChange={((e) => setValueSearch(e.target.value))}
                    />
                </div>
                <div className="rounded-md bg-blue-400 text-white btn-search cursor-pointer" onClick={inputListeners}>Search</div>
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
            <UpdateCampaign campaignActive={campaignActive} setStatusUpdate={setStatusUpdate}
                            setIsOpenSuccess={setIsOpenSuccess}
                            setTextSuccess={setTextSuccess}
                            setIsOpenError={setIsOpenError}
                            setTextError={setTextErrors}
            />
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