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
import {formatDate} from "@/pages/user";
const _ = require('lodash');

export function dataInputProduct() {
    const data: InputProduct = {
        filter: {
            search: '',
            product_id: [],
            category_id: [],
            campaign_id: [],
            price: {
                min: 0,
                max: 10000000
            },
            import_date: {
                min: '2000-01-01',
                max: '3000-01-01'
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
    const [filterProduct, setFilterProduct] = useState(dataInputProduct())
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [valueStatusUpdate, setValueStatusUpdate] = useState(0);
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [valueSearch, setValueSearch] = useState('');
    const [valueMinPrice, setValueMinPrice] = useState(0);
    const [valueMaxPrice, setValueMaxPrice] = useState(12000000)
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01')
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const router = useRouter();

    function nextAddProduct() {
        router.push("/add-product").then();
    }

    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterProduct);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.price.min = valueMinPrice;
        tempFilter.filter.price.max = valueMaxPrice;
        tempFilter.filter.import_date.min = valueMinImportDate;
        tempFilter.filter.import_date.max = valueMaxImportDate;
        setFilterProduct(tempFilter);
    }
    useEffect(() => {

        async function fetchProductData() {
            try {
                const res = await getListProduct(filterProduct)
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
    }, [statusProduct, statusUpdate, filterProduct, valueStatusUpdate])
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
            <div className="rounded-md bg-violet-700 text-white p-2"
                 style={{
                     width: "150px",
                     height: "50px",
                     textAlign: "center",
                     margin: "20px",
                     fontSize: "20px"
                 }}
                 onClick={nextAddProduct}>
                <i className="fa-sharp fa-solid fa-plus" style={{marginRight: "10px"}}></i>
                Thêm mới
            </div>
            <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "90%"}}>
                <p>Lọc sản phẩm</p>
                <div className="mr-3 ml-5">
                    <label>Giá từ(VNĐ):</label>
                    <input type="number" value={valueMinPrice}
                           onChange={(e) => setValueMinPrice(parseInt(e.target.value))} style={{width: "150px"}}/>
                    {/*<VndInput value={valueMinPrice} onChange={(e) => setValueMinPrice(e)} />*/}
                </div>
                <div>
                    <label>Giá đến(VNĐ):</label>
                    <input type="number" value={valueMaxPrice}
                           onChange={(e) => setValueMaxPrice(parseInt(e.target.value))} style={{width: "150px"}}/>
                    {/*<VndInput value={valueMaxPrice} onChange={(e) => setValueMaxPrice(e)} />*/}
                </div>
                <div className="mr-3 ml-5">
                    <label>Từ ngày:</label>
                    <input style={{width: "150px"}} type="date" value={formatDate(valueMinImportDate)}
                           onChange={(e) => setValueMinImportDate(e.target.value)}/>
                </div>
                <div>
                    <label>Đến ngày:</label>
                    <input style={{width: "150px"}} type="date" value={formatDate(valueMaxImportDate)}
                           onChange={(e) => setValueMaxImportDate(e.target.value)}/>
                </div>
                <input type="text" placeholder="Search..." value={valueSearch}
                       onChange={(e) => setValueSearch(e.target.value)}/>
                <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners}>
                    <i className="fa-solid fa-magnifying-glass" style={{marginRight: "10px"}}></i>
                    Search
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
                                        setStatusProduct={setStatusProduct}
                                        valueStatusUpdate={valueStatusUpdate}
                                        setValueStatusUpdate={setValueStatusUpdate}
                        />
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
