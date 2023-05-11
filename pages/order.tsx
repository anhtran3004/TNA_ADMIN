import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Order} from "@/components/HomeType";
import {changeStatus, getOrder} from "@/lib/API/Order";
import Layout from "@/components/Layout";
import {formatDates} from "@/pages/user";
import Pagination from "@/components/Pagination";

export default function OrderProduct() {
    const [activeStatus, setActiveStatus] = useState(0);
    const listStatus = ["Chờ xác nhận", "Đang giao", "Đã giao", "Đơn đã hủy"];
    const [listWaiting, setListWaiting] = useState<Order[]>([])
    const [listDelivering, setListDelivering] = useState<Order[]>([])
    const [listDelivered, setListDelivered] = useState<Order[]>([])
    const [listRemove, setListRemove] = useState<Order[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPostsWaiting = listWaiting.slice(indexOfFirstPost, indexOfLastPost)
    const currentPostsDelivering = listDelivering.slice(indexOfFirstPost, indexOfLastPost)
    const currentPostsDelivered = listDelivered.slice(indexOfFirstPost, indexOfLastPost)
    const currentPostsRemove = listRemove.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    useEffect(() => {
        async function fetchDataOrder() {
            try {
                if (activeStatus === 0) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListWaiting(res.data);
                    }
                }
                if (activeStatus === 1) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListDelivering(res.data);
                    }
                }
                if (activeStatus === 2) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListDelivered(res.data);
                    }
                }
                if (activeStatus === 3) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListRemove(res.data);
                    }
                }

            } catch (e) {
                console.log('error')
            }
        }

        fetchDataOrder().then();
    }, [activeStatus])

    async function ChangeStatus(id: number) {
        try {
            const res = await changeStatus(id, 1);
            if (res.code === 200) {
                console.log('change status success!');
                setActiveStatus(1);
            }
        } catch (e) {
            console.log('error')
        }
    }

    return <>
        <Layout>
            <div style={{marginLeft: "50px", marginTop: "30px"}}>
                <h5 className="text-order">Đơn hàng của tôi</h5>
                {/*<p>Tất cả đơn hàng</p>*/}
                <div className="status-order">
                    {listStatus.map((status, index) => (
                        <div key={index} onClick={() => {
                            setActiveStatus(index)
                        }}
                             className={(activeStatus === index) ? "status-order-active" : "status-order-item"}>{status}</div>
                    ))}
                </div>
                {(activeStatus === 0) && <>
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
                        {currentPostsWaiting.map((waiting, index) => (
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
                                <td style={{borderRight: "none", width: "110px"}}>
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                        <button className="btn-view-detail">Xem chi tiết</button>
                                    </Link>
                                </td>
                                <td style={{borderLeft: "none", width: "95px"}}>
                                    <button className="btn-view-delete-order"
                                            onClick={() => ChangeStatus(waiting.id)}>Xác nhận
                                    </button>
                                </td>
                                {/*</div>*/}

                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="pagination-page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={listWaiting.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </>}
                {(activeStatus === 1) && <>
                    <table border={1} className="table_order">

                        <thead>
                        <tr>
                            <th style={{width: "10px"}}>STT</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPostsDelivering.map((waiting, index) => (
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
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                        <button className="btn-view-detail">Xem chi tiết</button>
                                    </Link>
                                </td>
                                {/*</div>*/}

                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="pagination-page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={listDelivering.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </>}
                {(activeStatus === 2) && <>
                    <table border={1} className="table_order">

                        <thead>
                        <tr>
                            <th style={{width: "10px"}}>STT</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt hàng</th>
                            <th>Ngày giao hàng</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPostsDelivered.map((waiting, index) => (
                            <tr className="content-order" key={index}>
                                <td style={{width: "10px"}}>{index + 1}</td>
                                <td>{waiting.name}</td>
                                <td>{waiting.email}</td>
                                <td>{waiting.address}</td>
                                <td>{formatDates(waiting.created_date)}</td>
                                <td>{formatDates(waiting.shipped_date)}</td>
                                <td>{waiting.total_price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                })}</td>
                                {/*<div style={{width:"180px"}}>*/}
                                <td style={{borderRight: "none", width: "15px"}}>
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                        <button className="btn-view-detail">Xem chi tiết</button>
                                    </Link>
                                </td>
                                {/*<td style={{borderLeft: "none", width:"15px"}} ><button className="btn-view-delete-order">Hủy đơn</button></td>*/}
                                {/*</div>*/}

                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="pagination-page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={listDelivered.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </>}
                {(activeStatus === 3) && <>
                    <table border={1} className="table_order">

                        <thead>
                        <tr>
                            <th style={{width: "10px"}}>STT</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Ngày giao hàng</th>
                            <th>Tổng tiền</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPostsRemove.map((waiting, index) => (
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
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                        <button className="btn-view-detail">Xem chi tiết</button>
                                    </Link>
                                </td>
                                <td style={{borderLeft: "none", width: "15px"}}>
                                    {/*<Link href={"/product?id=" + waiting.}>*/}
                                    {/*<button className="btn-view-delete-order" style={{background: "blue"}}>Mua lại</button>*/}
                                    {/*</Link>*/}
                                </td>
                                {/*</div>*/}

                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="pagination-page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={listRemove.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </>}
                <div className="page">
                </div>
            </div>
        </Layout>

    </>
}