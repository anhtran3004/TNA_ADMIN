
import Link from "next/link";
import Pagination from "@/components/Pagination";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {InputOrderFilter, Order} from "@/components/HomeType";
import {changeStatus, getOrder} from "@/lib/API/Order";
import {formatDate, formatDates} from "@/pages/user";
import ReasonRemove from "@/components/Order/ReasonRemove";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
const _ = require('lodash');
interface Props{
    listWaiting: Order[],
    currentPostsWaiting: Order[],
    setActiveStatus: Dispatch<SetStateAction<number>>
    activeStatus: number
    setListWaiting: Dispatch<SetStateAction<Order[]>>

}
export function dataInputOrder(){
    const data: InputOrderFilter = {
        filter: {
            search: '',
            created_date:{
                min: '2023-01-01',
                max: '2050-01-01'
            }
        },
        sort:{
            field: 'created_date',
            order: 'DESC'
        },
        status: 0
    }
    return data;
}
export default function ListOrderWaiting(props: Props){
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [valueSearch, setValueSearch] = useState('');
    const [filterOrder, setFilterOrder] = useState<InputOrderFilter>(dataInputOrder());
    const [isOpenReason, setIsOpenReason] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [orderId, setOrderId] = useState<number>(-1);
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterOrder);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.created_date.min =  valueMinImportDate;
        tempFilter.filter.created_date.max = valueMaxImportDate;
        setFilterOrder(tempFilter);
    }
    async function ChangeStatus(id: number, status: number) {
        try {
            const res = await changeStatus(id, status);
            if (res.code === 200) {
                console.log('change status success!');
                props.setActiveStatus(status);
            }
        } catch (e) {
            console.log('error')
        }
    }
    async function fetchDataOrder(){
        const res = await getOrder(filterOrder);
        if (res.code === 200) {
            props.setListWaiting(res.data);
        }
    }
    useEffect(() => {
        fetchDataOrder().then();
    }, [filterOrder])
    return <>
        <div className="search-order d-flex border-2">
            <p>Lọc đơn hàng</p>
            <div className="mr-3 ml-5">
                <label>Từ:</label>
                <input style={{width:"150px"}} type="date" value={formatDate(valueMinImportDate)} onChange={(e) => setValueMinImportDate(e.target.value)}/>
            </div>
            <div>
                <label>Đến:</label>
                <input style={{width:"150px"}} type="date" value={formatDate(valueMaxImportDate)} onChange={(e) => setValueMaxImportDate(e.target.value)}/>
            </div>
            <input type="text" placeholder="Search..." value={valueSearch} onChange={(e) => setValueSearch(e.target.value)}/>
            {/*onClick={inputListeners}*/}
            <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners} style={{width:"100px"}}>
                <i className="fa-solid fa-magnifying-glass" style={{marginRight: "10px"}}></i>
                Search
            </div>

        </div>
        <table border={1} className="table_order">

            <thead>
            <tr>
                <th style={{width: "10px"}}>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Ngày đặt hàng</th>
                <th>Tổng tiền</th>
                <th colSpan={3}>Hành động</th>
            </tr>
            </thead>
            <tbody>
            {props.currentPostsWaiting.map((waiting, index) => (
                <tr className="content-order" key={index}>
                    <td style={{width: "10px"}}>{index + 1}</td>
                    <td>{waiting.name}</td>
                    <td>{waiting.email}</td>
                    <td>{waiting.address}</td>
                    <td>{formatDates(waiting.created_date)}</td>
                    <td>{waiting.total_price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                    })}</td>
                    {/*<div style={{width:"180px"}}>*/}
                    <td style={{borderRight: "none", width: "120px"}}>
                        <Link href={"/order-detail?orderId=" + waiting.id}>
                            <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                Xem chi tiết
                            </button>
                        </Link>
                    </td>
                    <td style={{borderLeft: "none", width: "95px", padding:"10px 0", borderRight: "none"}}>
                        <button className="btn-view-delete-order"
                                onClick={() => {
                                    // ChangeStatus(waiting.id, 3).then();
                                    setIsOpenReason(true);
                                    setOrderId(waiting.id);
                                }}
                                style={{width:"100px", padding:"10px 0", height:"50px", marginRight:"10px"}}
                        >
                            <i className="fa-solid fa-circle-xmark" style={{marginRight:"10px"}}></i>
                            Hủy đơn
                        </button>
                    </td>
                    <td style={{borderLeft: "none", width: "95px", padding:"10px 0"}}>
                        <button className="btn-view-confirm-order"
                                onClick={() => ChangeStatus(waiting.id, 1)}
                                style={{width:"100px", padding:"10px 0", height:"50px", marginRight:"10px"}}
                        >
                            <i className="fa-solid fa-circle-check" style={{marginRight:"10px"}}></i>
                            Xác nhận
                        </button>
                    </td>
                    {/*</div>*/}

                </tr>
            ))}

            </tbody>
        </table>
        {isOpenReason &&
            <ReasonRemove
                setIsOpenReason={setIsOpenReason}
                setIsOpenSuccess={setIsOpenSuccess}
                setTextSuccess={setTextSuccess}
                setIsOpenError={setIsOpenError}
                setTextError={setTextErrors}
                changeStatus={ChangeStatus}
                orderId={orderId}
            />
        }
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
    </>
}