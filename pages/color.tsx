import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {deleteColor, deleteProduct, getListColor, updateColor} from "@/lib/API";
import {Color, InputColorFilter, InputSizeFilter} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import AddColor from "@/components/Color/AddColor";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import ErrorAlert from "@/components/Alert/ErrorAlert";
const _ = require('lodash');
import {dataInputSize} from "@/pages/size";
import Pagination from "@/components/Pagination";
export function DefaultColorData(): Color{
    const data ={
        id: 0,
        name: "",
        status: 0,
    }
    return data;
}
export function dataInputColor() {
    const data: InputColorFilter = {
        filter: {
            search: '',
        }
    }
    return data;
}
export default function Color() {
    const router = useRouter()
    const [listColor, setListColor] = useState<Color[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const [isOpenErrorDeleteProductAlert, setIsOpeErrorDeleteProductAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa màu này không?";
    const [colorId, setColorId] = useState(0)
    const [statusColor, setStatusColor] = useState(0)
    const [valueColor, setValueColor] = useState("");
    const [colorSelected, setColorSelected] = useState<Color>(DefaultColorData());
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [valueSearch, setValueSearch] = useState('');
    const [filterColor, setFilterColor] = useState<InputColorFilter>(dataInputColor());
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = listColor.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    async function DeleteColor() {
        console.log("colorId", colorId);
        try{
            const res = await deleteColor(colorId);
            if(res.code === 200){
                console.log('deleted success!');
                setStatusColor(colorId);
            }else{
                setIsOpeErrorDeleteProductAlert(true);
                setIsOpenDeleteProductAlert(false);
            }

        }catch (e){
            console.log('error');
            setIsOpeErrorDeleteProductAlert(true);
            setIsOpenDeleteProductAlert(false);
        }

    }
    async function UpdateColor() {
        if(valueColor === ''){
            setTextErrors("Insert Errors!")
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await updateColor(valueColor, colorSelected.id);
            if(res.code === 200){
                console.log('updated success!');
                setStatusColor(randomNumberInRange(1,1000));
                setTextSuccess("Update Success!")
                setIsOpenSuccess(true);
                setTimeout(() =>setIsOpenSuccess(false), 2000)
            }
        }catch (e){
            console.log('error');
            setTextErrors("Update Error!")
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
        }

    }

    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterColor);
        tempFilter.filter.search = valueSearch;
        setFilterColor(tempFilter);
    }
    async function fetchColors() {
        try {
            // console.log("id", id);
            const res = await getListColor(filterColor);
            if (res.code === 200) {
                setListColor(res.data);
                // setStatusColor(randomNumberInRange(1,1000));
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === colorId) {
                        setColorSelected(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() =>{
        fetchColors().then();
    }, [statusColor,colorId, filterColor])
    useEffect(() =>{
        setValueColor(colorSelected.name);
    }, [colorSelected])

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
                 onClick={() => setIsOpenAddProduct(true)}>
                <i className="fa-sharp fa-solid fa-plus" style={{marginRight: "10px"}}></i>
                Thêm mới
            </div>
            <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "30%", marginTop:"15px"}}>
                <p>Lọc màu</p>
                <input type="text" placeholder="Search..." value={valueSearch}
                       onChange={(e) => setValueSearch(e.target.value)}/>
                {/*onClick={inputListeners}*/}
                <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2"
                     onClick={inputListeners}>
                    <i className="fa-solid fa-magnifying-glass" style={{marginRight: "10px"}}></i>
                    Search
                </div>

            </div>
            <table border={1} style={{width: "500px", marginLeft: "50px"}}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Màu sắc</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((color, index) => (
                    <tr key={index} onClick={() => setColorId(color.id)}
                        className={(colorId === color.id) ? "selected-product" : ""}
                    >
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{color.name}</td>
                        <td className="text-center">
                            <button className="rounded-full text-white bg-red-800 w-20 px-2"
                                    onClick={() => {setIsOpenDeleteProductAlert(true); setColorId(color.id)}}
                                    style={{width:"100px", padding: "10px 0"}}
                            >
                                <i className="fa-solid fa-trash-can" style={{marginRight:"10px"}}></i>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination-page" style={{width:"600px"}}>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={listColor.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div className="update-color">
                <h2 className=" font-bold text-2xl ml-5">Cập nhật màu sắc:</h2>
                <div className="input-product">
                    <label htmlFor="priority">Màu sắc</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="text"
                        id="priority"
                        name="priority"
                        value={valueColor}
                        onChange={(e) => setValueColor(e.target.value)}
                    />

                </div>
                <button onClick={UpdateColor} className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Cập nhật
                </button>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteColor}/>
            </Modal>
        )}
        {isOpenErrorDeleteProductAlert &&
            <Modal>
                <ErrorAlert textError={"Màu sắc đang được sử dụng không được phép xóa!"} setIsCloseAlert={setIsOpeErrorDeleteProductAlert} />
            </Modal>
        }
        {isOpenAddProduct && (
            <Modal>
                <AddColor setStatusColor={setStatusColor} setIsOpenAddProduct={setIsOpenAddProduct}
                          setIsOpenSuccess={setIsOpenSuccess}
                          setTextSuccess={setTextSuccess}
                          setIsOpenError={setIsOpenError}
                          setTextError={setTextErrors}
                />
            </Modal>
        )}
        {isOpenSuccess && (
        <Modal>
            <Success textSuccess={textSuccess} />
        </Modal>
        )}
        {isOpenError && (
            <Modal>
                <Errors textError={textErrors} />
            </Modal>
        )}
    </>
}