import {InputBlockProduct, InputBlockUser, Product} from "@/components/HomeType";
import Link from "next/link";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {deleteProduct} from "@/lib/API";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/User/UpdateUser";
interface Props{
    onClick: () => void,
    productSelected: number,
    product: Product,
    index: number,
    id: number,
    setStatusProduct: Dispatch<SetStateAction<number>>
    valueStatusUpdate: number
    setValueStatusUpdate: Dispatch<SetStateAction<number>>
}
export function ContentProduct(props: Props) {
    const textError = "Bạn có chắc chắn muốn xóa sản phẩm này không?";
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const [valueStatus, setValueStatus] = useState(0);
    const [isOpenUnBlockCategoryAlert, setIsOpenUnBlockCategoryAlert] = useState(false);
    function defaultDataInput(): InputBlockProduct {
        const data = {
            id: props.product.id,
            status: valueStatus
        }
        return data;

    }
        async function DeleteProduct() {
            try{
                const res = await deleteProduct(defaultDataInput());
                if(res.code === 200){
                    console.log('deleted success!');
                    props.setStatusProduct(props.id);
                }
            }catch (e){
                console.log('error');
            }

        }
    return<>
    <tr onClick={props.onClick}
               className={(props.productSelected === props.product.id) ? "selected-product" : ""}>
        <td>{props.index + 1}</td>
        <td>{props.product.name}</td>
        <td>
            <div
                dangerouslySetInnerHTML={{__html: props.product.description}}
            />
        </td>
        <td>{props.product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        })}</td>
        <td className="flex items-center border-none justify-evenly" style={{width: "250px"}}>
            {/*<button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => setIsOpenDeleteProductAlert(true)}>Xóa</button>*/}
            {props.product.status === 1 ?
                <td className="flex  items-center border-none justify-evenly" style={{width:"200px"}}>
                    <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {
                        setIsOpenDeleteProductAlert(true);
                        setValueStatus(0);
                        props.setValueStatusUpdate(randomNumberInRange(1, 1000))
                    }}
                    style={{padding:"10px 0"}}>
                        <i className="fa-solid fa-lock" style={{marginRight:"10px"}}></i>
                        Khóa
                    </button>
                </td>
                :
                <td className="flex  items-center border-none justify-evenly">
                    <button className="rounded-full text-white bg-red-800 w-30 px-2" onClick={() => {
                        setIsOpenUnBlockCategoryAlert(true);
                        setValueStatus(1)
                        props.setValueStatusUpdate(randomNumberInRange(1, 1000))

                    }}
                    style={{width:"110px", padding: "10px 0"}}>
                        <i className="fa-solid fa-unlock" style={{marginRight:"10px"}}></i>
                        Hủy khóa
                    </button>
                </td>
            }
            <Link href={"/product-detail?id=" + props.product.id}>

                <button className="rounded-full text-white bg-blue-400 px-2" style={{width:"120px", padding: "10px 0"}}>
                    <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                    Xem chi tiết
                </button>
            </Link>
        </td>
    </tr>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteProduct}/>
            </Modal>
        )}
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn khóa sản phẩm này không?"}
                               setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteProduct}/>
            </Modal>
        )}
        {isOpenUnBlockCategoryAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn mở khóa sản phẩm này không?"}
                               setIsOpenQuestionAlert={setIsOpenUnBlockCategoryAlert}
                               setOkListener={DeleteProduct}/>
            </Modal>
        )}
    </>
}