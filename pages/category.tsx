import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {getListCategory} from "@/lib/API";
import {Category, InputBlockUser, InputCategory} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {deleteCategory, deleteProductFollowCategory, updateCategory} from "@/lib/API/Category";
import AddCategory from "@/components/Category/AddCategory";

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

export default function Category() {
    const router = useRouter()
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const [isOpenUnBlockCategoryAlert, setIsOpenUnBlockCategoryAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa danh mục này không?";
    const [categoryId, setCategoryId] = useState(0)
    const [statusCategory, setStatusCategory] = useState(0)
    const [valueCategory, setValueCategory] = useState("");
    const [valueStatus, setValueStatus] = useState(0);
    const [categorySelected, setCategorySelected] = useState<Category>(DefaultCategoryData());
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");

    function defaultDataInput(): InputBlockUser {
        const data = {
            ids: [categoryId],
            status: valueStatus
        }
        return data;

    }
    async function DisableProduct(){
        try{
            const res = await deleteProductFollowCategory(valueStatus, categoryId);
            if(res.code === 200){
                console.log('delete product follow success!')
            }
        }catch (e) {
            console.log('Error delete product follow category');
        }
    }
    async function DeleteCategory() {
        try {
            const res = await deleteCategory(defaultDataInput());
            if (res.code === 200) {
                console.log('deleted success!');
                setStatusCategory(categoryId);
                DisableProduct().then();
            }
        } catch (e) {
            console.log('error');
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
        if(valueCategory === ''){
            setTextErrors("Insert Errors!")
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
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

    function nextCategoryNew() {
        router.push("/new-router").then();
    }

    async function fetchCategories() {
        try {
            // console.log("id", id);
            const res = await getListCategory();
            if (res.code === 200) {
                setListCategory(res.data);
                // setStatusCategory(randomNumberInRange(1,1000));
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
                <div>
                    <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                         onClick={() => setIsOpenAddProduct(true)}>Add New Category
                    </div>
                </div>
                <table border={1} style={{width: "500px", marginLeft: "50px"}}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listCategory.map((category, index) => (
                        <tr key={index} onClick={() => setCategoryId(category.id)}
                            className={(categoryId === category.id) ? "selected-product" : ""}
                        >
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{category.categoryName}</td>
                            {category.status === 1 ?
                                <td className="flex w-56  items-center border-none justify-evenly">
                                    <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {
                                        setIsOpenDeleteProductAlert(true);
                                        setValueStatus(0);
                                        console.log(valueStatus)
                                    }}>Khóa
                                    </button>
                                </td>
                                :
                                <td className="flex w-56  items-center border-none justify-evenly">
                                    <button className="rounded-full text-white bg-red-800 w-30 px-2" onClick={() => {
                                        setIsOpenUnBlockCategoryAlert(true);
                                        setValueStatus(1)
                                    }}>Hủy khóa
                                    </button>
                                </td>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="update-category">
                    <h2 className=" font-bold text-2xl ml-5">Update category:</h2>
                    <div className="input-product">
                        <label htmlFor="priority">Category:</label>
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
                            className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update category
                    </button>
                </div>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn khóa danh mục này không?"}
                               setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteCategory}/>
            </Modal>
        )}
        {isOpenUnBlockCategoryAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn mở khóa danh mục này không?"}
                               setIsOpenQuestionAlert={setIsOpenUnBlockCategoryAlert}
                               setOkListener={DeleteCategory}/>
            </Modal>
        )}
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