import React, {useEffect, useState} from "react";

import {useRouter} from "next/router";

import Image from "next/image";
import Layout from "@/components/Layout";
import {OrderProduct} from "@/components/HomeType";
import {getOrderProduct} from "@/lib/API/Order";
export default function OrderDetail(){
    const router = useRouter();
    const orderId = router.query.orderId;
    const [listOrder, setListOrder] = useState<OrderProduct[]>([])
    useEffect(() =>{
        async function fetchOrderProduct(){
            try{
                const res = await getOrderProduct(parseInt(orderId+""));
                if(res.code === 200){
                    setListOrder(res.data);
                }
            }catch (e) {
                console.log('error')
            }
        }
        fetchOrderProduct().then();

    }, [])
    async function fetchProduct(){

    }
    return<>
        <Layout>
            <div style={{marginLeft: "50px", marginTop:"30px"}}>
                <h1 className="container" style={{padding: "20px 0", fontSize: "20px", fontWeight: "bold"}}>Chi tiết đơn hàng</h1>
                <div className="container" style={{marginBottom: "20px"}}>
                    <a href="/order" className="cart__btn-back">Trở về</a>
                </div>

                <table border={1} className="table_order container">

                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Màu sắc</th>
                        <th>Kích cỡ</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng tiền</th>

                    </tr>
                    </thead>
                    <tbody>
                    {listOrder.map((order,  index) =>(
                        <tr className="content-order" key={index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td><Image src={order.thumb} alt="" width={100} height={133} /></td>
                            <td>{order.color}</td>
                            <td>{order.size}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                            <td>{(order.quantity * order.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </Layout>

    </>
}