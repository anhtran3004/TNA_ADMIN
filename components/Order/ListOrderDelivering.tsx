import {formatDate, formatDates} from "@/pages/user";
import Link from "next/link";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {GetInputInventory, InputOrderFilter, InputUpdateInventory, Order, OrderProduct} from "@/components/HomeType";
import {changeStatus, getOrder, getOrderProduct, updateShippedDate} from "@/lib/API/Order";
import {getQuantityOfInventory, updateInventories} from "@/lib/API/Inventory";
const _ = require('lodash');
interface Props{
    listDelivering: Order[],
    currentPostsDelivering: Order[],
    setActiveStatus: Dispatch<SetStateAction<number>>
    activeStatus: number
    setListDelivering: Dispatch<SetStateAction<Order[]>>

}

export default function ListOrderDelivering(props: Props){

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
    function defaultDataInputQuantity(colorName: string, size: string) : GetInputInventory{
        const data ={
            product_input:{
                color_name: colorName,
                size: size
            }
        }
        return data;
    }
    function defaultDataInputInventory(size: string, colorName: string, quantity: number) : InputUpdateInventory{
        const data ={
            product_input: {
                color_name: colorName,
                size: size,
                quantity: quantity
            }
        }
        return data;
    }

    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [filterOrder, setFilterOrder] = useState<InputOrderFilter>(dataInputOrder());
    const [valueSearch, setValueSearch] = useState('');
    const [activeStatus, setActiveStatus] = useState(0);
    const [listOrder, setListOrder] = useState<OrderProduct[]>([])
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterOrder);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.created_date.min =  valueMinImportDate;
        tempFilter.filter.created_date.max = valueMaxImportDate;
        setFilterOrder(tempFilter);
    }
    async function ChangeStatus(id: number, status: number){
        try{
            const res = await changeStatus(id, status);
            if(res.code === 200){
                console.log('change status success!', id);
                // setActiveStatus(status);
                props.setActiveStatus(2);
                // setOrderId(id);
                await fetchOrderProduct(id);
                await UpdateInventory().then();
                await  UpdateShippedDate(id);
            }
        }catch (e) {
            console.log('error')
        }
    }
    async function UpdateShippedDate(id: number){
        try{
            const res = await updateShippedDate(id)
            if(res.code === 200){
                console.log('update success!')
            }
        }catch (e) {
            console.log('Err')
        }
    }
    async function UpdateInventory(){
        try {
            for(let i = 0; i < listOrder.length; i++){
                const response = await getQuantityOfInventory(defaultDataInputQuantity(listOrder[i].color, listOrder[i].size), listOrder[i].product_id);
                if(response.code === 200){
                    if(response.data.length > 0){
                        const res = await updateInventories(defaultDataInputInventory(listOrder[i].color, listOrder[i].size, (response.data[0].quantity - listOrder[i].quantity)), listOrder[i].product_id);
                        if(res.code === 200){
                            console.log('update success!')
                        }
                    }
                }

            }
            // const res = await updateInventory(defaultDataInputInventory())
        }catch (e) {
            console.log('error update quantity of inventory')
        }
    }
    async function fetchOrderProduct(orderId : number){
        try{
            const res = await getOrderProduct(orderId);
            if(res.code === 200){
                setListOrder(res.data);
                for(let i = 0; i < res.data.length; i++){
                    const response = await getQuantityOfInventory(defaultDataInputQuantity(res.data[i].color, res.data[i].size), res.data[i].product_id);
                    if(response.code === 200){
                        console.log("quantity", response.data[0].quantity)
                        if(response.data.length > 0){
                            console.log('quantity inventory', response.data[0].quantity - res.data[i].quantity, res.data[i].color, res.data[i].size, res.data[i].product_id);
                            const resa = await updateInventories(defaultDataInputInventory(res.data[i].size, res.data[i].color, (response.data[0].quantity - res.data[i].quantity)), res.data[i].product_id);
                            if(resa.code === 200){
                                console.log('update success!')
                            }
                        }
                    }
                }

            }
        }catch (e) {
            console.log('error')
        }
    }
    async function fetchDataOrder(){
        const res = await getOrder(filterOrder);
        if (res.code === 200) {
            props.setListDelivering(res.data);
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
            <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners}>
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
                <th colSpan={2}>Hành động</th>
            </tr>
            </thead>
            <tbody>
            {props.currentPostsDelivering.map((waiting, index) => (
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
                    <td style={{borderRight: "none", width: "100px"}}>
                        <Link href={"/order-detail?orderId=" + waiting.id}>
                            <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                Xem chi tiết
                            </button>
                        </Link>
                    </td>
                    <td style={{borderLeft: "none", width: "100px" }} >
                        <button className="btn-view-delete-order"
                                onClick={() => ChangeStatus(waiting.id, 2)}
                                style={{width:"130px", background:"orange", padding:"10px 0", height:"50px", marginRight:"10px"}}
                        >
                            <i className="fa-solid fa-circle-check" style={{marginRight:"10px"}}></i>
                            Đã giao hàng
                        </button></td>
                    {/*</div>*/}

                </tr>
            ))}

            </tbody>
        </table>
    </>
}