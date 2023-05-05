import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {InputProduct, Product} from "@/components/HomeType";
import {getListProduct} from "@/lib/API";
import {UpdateProduct} from "@/components/Product/UpdateProduct";
import {UploadImage} from "@/components/Product/uploadImage";
import {ContentProduct} from "@/components/Product/ContentProduct";
import {HeaderTable} from "@/components/Product/HeaderTable";
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";

// import storage = firebase.storage;

export function dataInputProduct() {
    const data: InputProduct = {
        filter: {
            product_id: [],
            category_id: [],
            campaign_id: [],
            price: {
                min: 0,
                max: 10000000
            }
        },
        sort: {
            field: "import_date",
            order: "DESC"
        },
        pagination: {
            page: 0,
            perPage: 1000
        }
    }
    return data;
}

export function dataOutputProduct(): Product {
    const data = {
        id: 0,
        name: "",
        description: "",
        price: 0,
        thumb: "",
        status: 0,
        hot: 0,
        import_date: "",
        update_date: "",
        category_id: 0,
        campaign_id: 0,
        discount_id: 0,
        favorite: 0,
        priority: 0
    }
    return data;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([])
    const [productActive, setProductActive] = useState<Product>(dataOutputProduct())
    const [productSelected, setProductSelected] = useState<number>(-1);
    const [statusProduct, setStatusProduct] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const router = useRouter();

    function nextAddProduct() {
        router.push("/add-product").then();
    }

    useEffect(() => {

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

        console.log("statusUpdate", statusUpdate);
        fetchProductData().then();
    }, [statusProduct, statusUpdate])
    useEffect(() => {
        async function getProductSelected() {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === productSelected) {
                    setProductActive(products[i]);
                }
            }
        }

        getProductSelected().then();
    }, [productSelected])
    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                     onClick={nextAddProduct}>Add New Product
                </div>
            </div>
            <div className="flex justify-evenly">
                <table border={1}>
                    <HeaderTable/>
                    <tbody>
                    {currentPosts.map((product, index) => (
                        <ContentProduct key={product.id} onClick={() => setProductSelected(product.id)}
                                        index={index}
                                        productSelected={productSelected} product={product} id={product.id}
                                        setStatusProduct={setStatusProduct}/>
                    ))}
                    </tbody>
                </table>

                <UploadImage productActive={productActive} setStatusUpdate={setStatusUpdate}/>
            </div>
            <div className="pagination-page">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={products.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div style={{marginTop: "50px"}}>
                <UpdateProduct productActive={productActive} setStatusUpdate={setStatusUpdate}
                               setIsOpenSuccess={setIsOpenSuccess}
                               setTextSuccess={setTextSuccess}
                               setIsOpenError={setIsOpenError}
                               setTextError={setTextErrors}
                />
            </div>
        </Layout>
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