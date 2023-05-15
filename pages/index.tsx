import {Inter} from 'next/font/google'
import Layout from "@/components/Layout";
import RevenueYear from "@/components/dashboard/RevenueYear";
import RevenueMonth from "@/components/dashboard/RevenueMonth";
import RevenueDate from "@/components/dashboard/RevenueDate";
import React, {useEffect, useState} from "react";
import NewUser from "@/components/Statistical/NewUser";
import NewUserFollowYear from "@/components/Statistical/NewUserFollowYear";
import NewUserFollowMonth from "@/components/Statistical/NewUserFollowMonth";
import HotProduct from "@/components/Statistical/HotProduct";
import {getComment} from "@/lib/API/Comment";
import {dataInputComment} from "@/pages/comment";
import {Comments, Contact, Product} from "@/components/HomeType";
import {getContact} from "@/lib/API/Contact";
import {getListProduct} from "@/lib/API";
import {dataInputProduct} from "@/pages/product";
import {getListOrder} from "@/lib/API/Order";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const listDate = ['NGÀY', 'THÁNG', 'NĂM'];
    const [activeRevenue, setActiveRevenue] = useState(0);
    const [activeNewUser, setActiveNewUser] = useState(0);
    const [Comments, setComments] = useState<Comments[]>([])
    const [Contacts, setContacts] = useState<Contact[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [orders, setOrders] = useState([]);
    async function fetchContactData() {
        try {
            const res = await getContact()
            const status = res.code;
            if (status === 200) {
                setContacts(res.data);
            } else {
                console.log('error');
            }
        } catch (e) {
            console.log('error');
        }
    }
    async function fetchProductData() {
        try {
            const res = await getListProduct(dataInputProduct())
            const status = res.code;
            if (status === 200) {
                setProducts(res.data);
            } else {
                console.log('error');
            }
        } catch (e) {
            console.log('error');
        }
    }
    async function fetchCommentData() {
        try {
            const res = await getComment(dataInputComment())
            const status = res.code;
            if (status === 200) {
                setComments(res.data);
            } else {
                console.log('error');
            }
        } catch (e) {
            console.log('error');
        }
    }
    async function fetchOrderData() {
        try {
            const res = await getListOrder()
            const status = res.code;
            if (status === 200) {
                setOrders(res.data);
            } else {
                console.log('error');
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() => {
        fetchContactData().then()
        fetchCommentData().then();
        fetchProductData().then();
        fetchOrderData().then();
    }, [])
    return <>
        <Layout>
            <div className="header-statistical container">
                <div className="order-quantity">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <p>{orders.length}</p>
                    <span>ĐƠN HÀNG</span>
                </div>
                <div className="comment-quantity">
                    <i className="fa-solid fa-comment"></i>
                    <p>{Comments.length}</p>
                    <span>BÌNH LUẬN</span>
                </div>
                <div className="contact-quantity">
                    <i className="fa-solid fa-comments"></i>
                    <p>{Contacts.length}</p>
                    <span>LIÊN HỆ</span>
                </div>
                <div className="product-quantity">
                    <i className="fa-solid fa-fire"></i>
                    <p>{products.length}</p>
                    <span>SẢN PHẨM</span>
                </div>
            </div>
            <div className="revenue container">
                <div className="text-3xl font-bold">Doanh thu:</div>
                <div className="revenue-tabs">
                    {listDate.map((data, index) => (
                        <div key={index} className={(activeRevenue === index) ? "revenue-active" : "revenue-item"}
                             onClick={() => setActiveRevenue(index)}>{data}</div>
                    ))}
                </div>
                {(activeRevenue === 0) && <RevenueDate/>}
                {(activeRevenue === 1) && <RevenueMonth/>}
                {(activeRevenue === 2) && <RevenueYear/>}
            </div>
            <div className="new-users container">
                <div className="text-3xl font-bold">Thống kê thành viên mới:</div>

                <div className="revenue-tabs">
                    {listDate.map((data, index) => (
                        <div key={index} className={(activeNewUser === index) ? "revenue-active" : "revenue-item"}
                             onClick={() => setActiveNewUser(index)}>{data}</div>
                    ))}
                </div>
                {(activeNewUser === 0) && <NewUser/>}
                {(activeNewUser === 1) && <NewUserFollowMonth/>}
                {(activeNewUser === 2) && <NewUserFollowYear/>}
            </div>
            <div className="hot-product container">
                <div className="text-3xl font-bold mb-4">Danh sách sản phẩm bán chạy trong tháng:</div>
                <HotProduct/>

            </div>
        </Layout>
    </>
}
