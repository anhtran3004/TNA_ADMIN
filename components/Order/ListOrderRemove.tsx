import {formatDate, formatDates} from "@/pages/user";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {InputOrderFilter, Order} from "@/components/HomeType";
import {changeStatus, getOrder} from "@/lib/API/Order";
import ViewReasonRemove from "@/components/Order/ViewReasonRemove";
const _ = require('lodash');
interface Props{
    listRemove: Order[],
    currentPostsRemove: Order[],
    setActiveStatus: Dispatch<SetStateAction<number>>
    activeStatus: number
    setListRemove: Dispatch<SetStateAction<Order[]>>

}

export default function ListOrderRemove(props: Props){
    function dataInputOrder(){
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
            status: props.activeStatus
        }
        return data;
    }
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [filterOrder, setFilterOrder] = useState<InputOrderFilter>(dataInputOrder());
    const [valueSearch, setValueSearch] = useState('');
    const [isOpenViewReason, setIsOpenViewReason] = useState(false);
    const [orderId, setOrderId] = useState(-1)
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterOrder);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.created_date.min =  valueMinImportDate;
        tempFilter.filter.created_date.max = valueMaxImportDate;
        setFilterOrder(tempFilter);
    }
    async function fetchDataOrder(){
        const res = await getOrder(filterOrder);
        if (res.code === 200) {
            props.setListRemove(res.data);
        }
    }
    useEffect(() => {
        fetchDataOrder().then();
    }, [props.activeStatus,filterOrder])
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
            <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners}>Search</div>

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
                <th colSpan={2}>Action</th>
            </tr>
            </thead>
            <tbody>
            {props.currentPostsRemove.map((waiting, index) => (
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
                    <td style={{borderRight: "none", width: "15px"}}>
                            <button className="btn-view-confirm-order" style={{width:"170px", padding:"10px 0", height:"50px", margin:"0 10px"}}
                                    onClick={() => {setIsOpenViewReason(true); setOrderId(waiting.id)}}
                            >
                                <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                Xem lý do hủy đơn
                            </button>
                    </td>
                    <td style={{borderRight: "none", width: "15px"}}>
                        <Link href={"/order-detail?orderId=" + waiting.id}>
                            <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                Xem chi tiết
                            </button>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        {isOpenViewReason &&
            <ViewReasonRemove setIsOpenReason={setIsOpenViewReason} orderId={orderId}/>
        }
    </>
}