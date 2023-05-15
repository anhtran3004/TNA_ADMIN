import {getHotListProduct} from "@/lib/API/Statistical";
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Pagination from "@/components/Pagination";
interface HotProduct {
    product_id: number,
    total: number,
    name: string
}
export default function HotProduct(){
    const [listProduct, setListProduct] = useState<HotProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = listProduct.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    async function GetListProduct(){
        try{
            const res = await getHotListProduct();
            if(res.code === 200){
                setListProduct(res.data);
            }
        }catch (e) {
            console.log('Error get trending list product', e)
        }
    }
    useEffect(() => {
        GetListProduct().then();
    }, [])
    return <>
        <table border={1} style={{width: "500px",margin:"auto", marginLeft: "50px", marginBottom: "20px"}}>
            <thead>
            <tr>
                <th>STT</th>
                {/*<th>Sản phẩm</th>*/}
                <th>Tên sản phẩm</th>
                <th>Tổng số lượng bán ra</th>
            </tr>
            </thead>
            <tbody>
            {currentPosts.map((item, index) => (
                <tr key={index}
                >
                    <td className="text-center">{index + 1}</td>
                    {/*<td className="text-center">{item.product_id}</td>*/}
                    <td>{item.name}</td>
                    <td className="text-center">{item.total}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="pagination-page" >
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={listProduct.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    </>
}