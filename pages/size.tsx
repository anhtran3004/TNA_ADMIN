import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {InputSizeFilter, Size} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {deleteSize, updateSize} from "@/lib/API/Size";
import {getListSize} from "@/lib/API";
import AddSize from "@/components/Size/AddSize";
import ErrorAlert from "@/components/Alert/ErrorAlert";
import Pagination from "@/components/Pagination";

const _ = require('lodash');

export function DefaultSizeData(): Size {
    const data = {
        id: 0,
        size: "",
        status: 0,
    }
    return data;
}

export function dataInputSize() {
    const data: InputSizeFilter = {
        filter: {
            search: '',
        }
    }
    return data;
}

export default function Size() {
    const router = useRouter()
    const [listSize, setListSize] = useState<Size[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa màu này không?";
    const [SizeId, setSizeId] = useState(0)
    const [statusSize, setStatusSize] = useState(0)
    const [valueSize, setValueSize] = useState("");
    const [SizeSelected, setSizeSelected] = useState<Size>(DefaultSizeData());
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [isOpenErrorDeleteSizeAlert, setIsOpeErrorDeleteSizeAlert] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [filterSize, setFilterSize] = useState<InputSizeFilter>(dataInputSize());
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = listSize.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    async function DeleteSize() {
        try {
            const res = await deleteSize(SizeId);
            if (res.code === 200) {
                console.log('deleted success!');
                setStatusSize(SizeId);
            } else {
                setIsOpeErrorDeleteSizeAlert(true);
                setIsOpenDeleteProductAlert(false);
            }
        } catch (e) {
            console.log('error');
        }

    }

    async function UpdateSize() {
        if (valueSize === '') {
            setTextErrors("Insert Errors!")
            setIsOpenError(true);
            setTimeout(() => setIsOpenError(false), 2000)
            return;
        }
        try {
            const res = await updateSize(valueSize, SizeSelected.id);
            if (res.code === 200) {
                console.log('updated success!');
                setStatusSize(randomNumberInRange(1, 1000));
                setTextSuccess("Cập Nhật Thành Công!")
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

    async function fetchSizes() {
        try {
            const res = await getListSize(filterSize);
            if (res.code === 200) {
                setListSize(res.data);
                // setStatusSize(randomNumberInRange(1,1000));
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === SizeId) {
                        setSizeSelected(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchSizes().then();
    }, [statusSize, SizeId, filterSize])
    useEffect(() => {
        setValueSize(SizeSelected.size);
    }, [SizeSelected])
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterSize);
        tempFilter.filter.search = valueSearch;
        setFilterSize(tempFilter);
    }
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
            <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "90%", marginTop: "15px"}}>
                <p>Lọc size</p>
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
                    <th>Size</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((Size, index) => (
                    <tr key={index} onClick={() => setSizeId(Size.id)}
                        className={(SizeId === Size.id) ? "selected-product" : ""}
                    >
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{Size.size}</td>
                        <td className="text-center">
                            <button className="rounded-full text-white bg-red-800 w-20 px-2"
                                    onClick={() => {
                                        setIsOpenDeleteProductAlert(true);
                                        setSizeId(Size.id)
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
            {listSize.length > 10 &&
                <div className="pagination-page" style={{width: "600px"}}>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={listSize.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            }
            <div className="update-Size">
                <h2 className=" font-bold text-2xl ml-5">Cập nhật kích cỡ:</h2>
                <div className="input-product">
                    <label htmlFor="priority">Size:</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="text"
                        id="priority"
                        name="priority"
                        value={valueSize}
                        onChange={(e) => setValueSize(e.target.value)}
                    />

                </div>
                <button onClick={UpdateSize} className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Cập nhật
                </button>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteSize}/>
            </Modal>
        )}
        {isOpenErrorDeleteSizeAlert &&
            <Modal>
                <ErrorAlert textError={"Size đang được sử dụng không được phép xóa!"}
                            setIsCloseAlert={setIsOpeErrorDeleteSizeAlert}/>
            </Modal>
        }
        {isOpenAddProduct && (
            <Modal>
                <AddSize setStatusSize={setStatusSize} setIsOpenAddProduct={setIsOpenAddProduct}
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