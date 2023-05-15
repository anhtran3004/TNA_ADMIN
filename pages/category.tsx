import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {getListCategory} from "@/lib/API";
import {Category, InputBlockUser, InputCategory, InputColorFilter} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {deleteCategory, deleteProductFollowCategory, updateCategory} from "@/lib/API/Category";
import AddCategory from "@/components/Category/AddCategory";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import Pagination from "@/components/Pagination";


export function DefaultCategoryData(): Category {
    const data = {
        id: 0,
        categoryName: '',
        sku: '',
        status: 0,
    }
    return data;
}

export function DefaultInputCategoryData(): InputCategory {
    const data = {
        category_input: {
            name: '',
            status: 1
        }
    }
    return data;
}
export function dataInputColor() {
    const data: InputColorFilter = {
        filter: {
            search: ''
        }
    }
    return data;
}

export default function Category() {
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const [isOpenUnBlockCategoryAlert, setIsOpenUnBlockCategoryAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa danh mục này không?";
    const [categoryId, setCategoryId] = useState(0)
    const [statusCategory, setStatusCategory] = useState(0)
    const [valueCategory, setValueCategory] = useState("");
    const [categorySelected, setCategorySelected] = useState<Category>(DefaultCategoryData());
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [isOpenErrorDeleteProductAlert, setIsOpeErrorDeleteProductAlert] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState<InputColorFilter>(dataInputColor());
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = listCategory.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const _ = require('lodash');
    async function DeleteCategory() {
        try {
            const res = await deleteCategory(categoryId);
            if (res.code === 200) {
                console.log('deleted success!');
                setStatusCategory(categoryId);
                // DisableProduct().then();
            } else {
                setIsOpeErrorDeleteProductAlert(true);
                setIsOpenDeleteProductAlert(false);
            }
        } catch (e) {
            console.log('error');
            setIsOpeErrorDeleteProductAlert(true);
            setIsOpenDeleteProductAlert(false);
        }

    }

    function DefaultInputCategoryData(): InputCategory {
        const data = {
            category_input: {
                name: valueCategory,
                status: 1
            }
        }
        return data;
    }

    async function UpdateCategory() {
        if (valueCategory === '') {
            setTextErrors("Insert Errors!")
            setIsOpenError(true);
            setTimeout(() => setIsOpenError(false), 2000)
            return;
        }
        try {
            const res = await updateCategory(DefaultInputCategoryData(), categorySelected.id);
            if (res.code === 200) {
                console.log('updated success!');
                setStatusCategory(randomNumberInRange(1, 1000));
                setTextSuccess("Update Success!")
                setIsOpenSuccess(true);
                setTimeout(() => setIsOpenSuccess(false), 2000)
            }
        } catch (e) {
            console.log('error');
            setTextErrors("Update Error!")
            setIsOpenError(true);
            setTimeout(() => setIsOpenError(false), 2000)
        }

    }

    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterCategory);
        tempFilter.filter.search = valueSearch;
        setFilterCategory(tempFilter);
    }

    async function fetchCategories() {
        try {
            const res = await getListCategory(filterCategory);
            if (res.code === 200) {
                setListCategory(res.data);
                setStatusCategory(randomNumberInRange(1,1000));
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === categoryId) {
                        setCategorySelected(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchCategories().then();
    }, [statusCategory, categoryId])
    useEffect(() => {
        setValueCategory(categorySelected.categoryName);
    }, [categorySelected])

    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2"
                     style={{
                         width: "150px",
                         height: "50px",
                         textAlign: "center",
                         margin: "20px",
                         fontSize: "20px"
                     }}
                     onClick={() => setIsOpenAddProduct(true)}>
                    <i className="fa-sharp fa-solid fa-plus" style={{marginRight: "10px"}}></i>
                    Thêm mới
                </div>
                <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "50%", marginTop:"15px"}}>
                    <p>Lọc danh mục</p>
                    <input type="text" placeholder="Search..." value={valueSearch}
                           onChange={(e) => setValueSearch(e.target.value)}/>
                    {/*onClick={inputListeners}*/}
                    <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2"
                         onClick={inputListeners} style={{width:"100px"}}>
                        <i className="fa-solid fa-magnifying-glass" style={{marginRight: "10px"}}></i>
                        Search
                    </div>

                </div>
                <table border={1} style={{width: "500px", marginLeft: "50px"}}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((category, index) => (
                        <tr key={index} onClick={() => setCategoryId(category.id)}
                            className={(categoryId === category.id) ? "selected-product" : ""}
                        >
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{category.categoryName}</td>
                            <td className="text-center">
                                <button className="rounded-full text-white bg-red-800 w-20 px-2"
                                        onClick={() => {
                                            setIsOpenDeleteProductAlert(true);
                                        }}
                                        style={{width: "100px", padding: "10px 0"}}
                                >
                                    <i className="fa-solid fa-trash-can" style={{marginRight: "10px"}}></i>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {listCategory.length > 10 &&
                    <div className="pagination-page" style={{width: "600px"}}>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={listCategory.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                }
                <div className="update-category">
                    <h2 className=" font-bold text-2xl ml-5">Cập nhật danh mục:</h2>
                    <div className="input-product">
                        <label htmlFor="priority">Danh mục:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="priority"
                            name="priority"
                            value={valueCategory}
                            onChange={(e) => setValueCategory(e.target.value)}
                        />
                    </div>
                    <button onClick={UpdateCategory}
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">
                        <i className="fa-solid fa-pen" style={{marginRight:"10px"}}></i>
                        Cập nhật
                    </button>
                </div>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteCategory}/>
            </Modal>
        )}
        {isOpenErrorDeleteProductAlert &&
            <Modal>
                <ErrorAlert textError={"Danh mục đang được sử dụng không được phép xóa!"}
                            setIsCloseAlert={setIsOpeErrorDeleteProductAlert}/>
            </Modal>
        }
        {isOpenAddProduct && (
            <Modal>
                <AddCategory setStatusCategory={setStatusCategory} setIsOpenAddProduct={setIsOpenAddProduct}
                             setIsOpenSuccess={setIsOpenSuccess}
                             setTextSuccess={setTextSuccess}
                             setIsOpenError={setIsOpenError}
                             setTextError={setTextErrors}
                />
            </Modal>
        )}
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