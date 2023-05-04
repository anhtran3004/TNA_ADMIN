import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {Size} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {deleteSize, updateSize} from "@/lib/API/Size";
import {getListSize} from "@/lib/API";
import AddSize from "@/components/Size/AddSize";
export function DefaultSizeData(): Size{
    const data ={
        id: 0,
        size: "",
        status: 0,
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
    async function DeleteSize() {
        try{
            const res = await deleteSize([SizeId]);
            if(res.code === 200){
                console.log('deleted success!');
                setStatusSize(SizeId);
            }
        }catch (e){
            console.log('error');
        }

    }
    async function UpdateSize() {
        if(valueSize === ''){
            setTextErrors("Insert Errors!")
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
            return;
        }
        try{
            const res = await updateSize(valueSize, SizeSelected.id);
            if(res.code === 200){
                console.log('updated success!');
                setStatusSize(randomNumberInRange(1,1000));
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
    function nextSizeNew() {
        router.push("/new-router").then();
    }

    async function fetchSizes() {
        try {
            // console.log("id", id);
            const res = await getListSize();
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
    useEffect(() =>{
        fetchSizes().then();
    }, [statusSize,SizeId])
    useEffect(() =>{
        setValueSize(SizeSelected.size);
    }, [SizeSelected])

    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                     onClick={() => setIsOpenAddProduct(true)}>Add New Size
                </div>
            </div>
            <table border={1} style={{width: "500px", marginLeft: "50px"}}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {listSize.map((Size, index) => (
                    <tr key={index} onClick={() => setSizeId(Size.id)}
                        className={(SizeId === Size.id) ? "selected-product" : ""}
                    >
                        <td>{index + 1}</td>
                        <td>{Size.size}</td>
                        <td>
                            <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {setIsOpenDeleteProductAlert(true); setSizeId(Size.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="update-Size">
                <h2 className=" font-bold text-2xl ml-5">Update Size:</h2>
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
                <button onClick={UpdateSize} className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Size
                </button>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteSize}/>
            </Modal>
        )}
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