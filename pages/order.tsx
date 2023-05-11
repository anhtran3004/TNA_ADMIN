import Link from "next/link";
import React, {useEffect, useState} from "react";
import {InputOrderFilter, Order} from "@/components/HomeType";
import {changeStatus, getOrder} from "@/lib/API/Order";
import Layout from "@/components/Layout";
import {formatDates} from "@/pages/user";
import Pagination from "@/components/Pagination";
import {formatDate} from "@/components/Campaign/ContentCampain";
import ListOrderWaiting from "@/components/Order/ListOrderWaiting";
import ListOrderDelivering from "@/components/Order/ListOrderDelivering";
import ListOrderDelivered from "@/components/Order/ListOrderDelivered";
import ListOrderRemove from "@/components/Order/ListOrderRemove";

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
                    <ListOrderWaiting listWaiting={listWaiting} currentPostsWaiting={currentPostsWaiting} setActiveStatus={setActiveStatus} activeStatus={activeStatus} setListWaiting={setListWaiting} />
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
                    <ListOrderDelivering listDelivering={listDelivering} currentPostsDelivering={currentPostsDelivering} setActiveStatus={setActiveStatus} activeStatus={activeStatus} setListDelivering={setListDelivering} />
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
                    <ListOrderDelivered listDelivered={listDelivered} currentPostsDelivered={currentPostsDelivered} setActiveStatus={setActiveStatus} activeStatus={activeStatus} setListDelivered={setListDelivered} />
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
                    <ListOrderRemove listRemove={listRemove} currentPostsRemove={currentPostsRemove} setActiveStatus={setActiveStatus} activeStatus={activeStatus} setListRemove={setListRemove} />
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