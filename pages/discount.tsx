import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {Discount, InputDiscount, InputDiscountFilter, InputOrderFilter} from "@/components/HomeType";
import React, {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {deleteDiscount, updateDiscount} from "@/lib/API/Discount";
import {getListDiscount} from "@/lib/API";
import {formatDate, formatDates} from "@/pages/user";
import AddDiscount from "@/components/Discount/AddDiscount";
const _ = require('lodash');
import {isEmpty} from "@firebase/util";

// import AddDiscount from "@/components/Discount/AddDiscount";

export function DefaultDiscountData(): Discount{
    const data ={
            id: 0,
            discount_code: '',
            discount_type: '',
            discount_value: 0,
            start_day: '',
            end_day: '',
            status: 0
    }
    return data;
}
export function dataInputDiscount(){
    const data: InputDiscountFilter = {
        filter: {
            search: '',
            start_day:{
                min: '2023-01-01',
                max: '2050-01-01'
            }
        },
        sort:{
            field: 'start_day',
            order: 'DESC'
        }
    }
    return data;
}
export default function Discount() {
    const router = useRouter()
    const [listDiscount, setListDiscount] = useState<Discount[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa mã giảm giá này không?";
    const [DiscountId, setDiscountId] = useState(0)
    const [statusDiscount, setStatusDiscount] = useState(0)
    const [valueDiscountCode, setValueDiscountCode] = useState("");
    const [valueDiscount, setValueDiscount] = useState(0);
    const [valueDiscountType, setValueDiscountType] = useState("");
    const [valueEndDay, setValueEndDay] = useState("");
    const [discountSelected, setDiscountSelected] = useState<Discount>(DefaultDiscountData());
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [valueSearch, setValueSearch] = useState('');
    const [filterDiscount, setFilterDiscount] = useState<InputDiscountFilter>(dataInputDiscount());
    async function DeleteDiscount() {
        try{
            const res = await deleteDiscount([DiscountId]);
            if(res.code === 200){
                console.log('deleted success!');
                setStatusDiscount(DiscountId);
            }
        }catch (e){
            console.log('error');
        }

    }
    function DefaultInputDiscountData(): InputDiscount{
        const data ={
            discount_input: {
                discount_code: valueDiscountCode,
                discount_type: valueDiscountType,
                discount_value: valueDiscount,
                end_day: formatDates(valueEndDay),
            }
        }
        return data;
    }
    async function UpdateDiscount() {

        if(isNaN(valueDiscount) || valueDiscountCode  === '' || valueDiscountType === '' || valueEndDay === ''){
            setTextErrors("Update Error!")
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
            return;
        }

        try{
            const res = await updateDiscount(DefaultInputDiscountData(), discountSelected.id);
            if(res.code === 200){
                console.log('updated success!');
                setStatusDiscount(randomNumberInRange(1,1000));
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
    async function fetchDiscounts() {
        try {
            // console.log("id", id);
            const res = await getListDiscount(filterDiscount);
            if (res.code === 200) {
                setListDiscount(res.data);
                // setStatusDiscount(randomNumberInRange(1,1000));
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === DiscountId) {
                        setDiscountSelected(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() =>{
        fetchDiscounts().then();
    }, [statusDiscount,DiscountId, filterDiscount])
    useEffect(() =>{
        setValueDiscountCode(discountSelected.discount_code);
        setValueDiscount(discountSelected.discount_value);
        setValueDiscountType(discountSelected.discount_type);
        setValueEndDay(discountSelected.end_day);
    }, [discountSelected])
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterDiscount);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.start_day.min =  valueMinImportDate;
        tempFilter.filter.start_day.max = valueMaxImportDate;
        setFilterDiscount(tempFilter);
    }
    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                     onClick={() => setIsOpenAddProduct(true)}>Add New Discount
                </div>
            </div>
            <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "90%"}}>
                <p>Lọc giảm giá</p>
                <div className="mr-3 ml-5">
                    <label>Từ:</label>
                    <input style={{width:"150px"}} type="date" value={formatDate(valueMinImportDate)} onChange={(e) => setValueMinImportDate(e.target.value)}/>
                </div>
                <div>
                    <label>Đến:</label>
                    <input style={{width:"150px"}} type="date" value={formatDate(valueMaxImportDate)} onChange={(e) => setValueMaxImportDate(e.target.value)}/>
                </div>
                <input type="text" placeholder="Search..." value={valueSearch} onChange={(e) => setValueSearch(e.target.value)}/>
                {/*onClick={inputListeners}*/}
                <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners}>Search</div>

            </div>
            <table border={1} style={{width: "1000px", marginLeft: "50px"}}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã giảm giá</th>
                    <th>Giá trị</th>
                    <th>Loại</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {listDiscount.map((discount, index) => (
                    <tr key={index} onClick={() => setDiscountId(discount.id)}
                        className={(DiscountId === discount.id) ? "selected-product" : ""}
                    >
                        <td>{index + 1}</td>
                        <td>{discount.discount_code}</td>
                        <td>{discount.discount_value}</td>
                        <td>{discount.discount_type}</td>
                        <td>{formatDates(discount.start_day)}</td>
                        <td>{formatDates(discount.end_day)}</td>
                        <td>
                            <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {setIsOpenDeleteProductAlert(true); setDiscountId(discount.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="update-Discount">
                <h2 className=" font-bold text-2xl ml-5">Update Discount:</h2>
                <div className="input-product">
                    <label htmlFor="priority">Mã giảm giá:</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="text"
                        id="priority"
                        name="priority"
                        value={valueDiscountCode}
                        onChange={(e) => setValueDiscountCode(e.target.value)}
                    />

                </div>
                <div className="input-product">
                    <label htmlFor="priority">Giá trị :</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="number"
                        id="priority"
                        name="priority"
                        value={valueDiscount}
                        onChange={(e) => setValueDiscount(parseFloat(e.target.value))}
                    />

                </div>
                <div className="input-product">
                    <label htmlFor="priority">Loại:</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="text"
                        id="priority"
                        name="priority"
                        value={valueDiscountType}
                        onChange={(e) => setValueDiscountType(e.target.value)}
                    />

                </div>
                <div className="input-product">
                    <label htmlFor="priority">Ngày kết thúc:</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="date"
                        id="priority"
                        name="priority"
                        value={formatDate(valueEndDay)}
                        onChange={(e) => setValueEndDay(e.target.value)}
                    />

                </div>
                <button onClick={UpdateDiscount} className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Discount
                </button>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteDiscount}/>
            </Modal>
        )}
        {isOpenAddProduct && (
            <Modal>
                <AddDiscount setStatusInsert={setStatusDiscount} setIsOpenAddDiscount={setIsOpenAddProduct}
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