import React, {useEffect, useState} from "react";
import {Campaign, Category, Discount, InputUpdateProduct} from "@/components/HomeType";
import {getListCampaign, getListCategory, getListDiscount, insertProduct, updateProduct} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import Modal from "@/components/Alert/Modal";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import {dataInputDiscount} from "@/pages/discount";
import {dataInputCampaign} from "@/pages/campaign";
import {dataInputColor} from "@/pages/category";

export default function AddProduct(){
    const [valueHot, setValueHot] = useState(1);
    const [valueCategory, setValueCategory] = useState(3);
    const [valueCampaign, setValueCampaign] = useState(1);
    const [valueDiscount, setValueDiscount] = useState(1);
    const [valueName, setValueName] = useState<string>("");
    const [valuePrice, setValuePrice] = useState(0);
    const [valuePriority, setValuePriority] = useState(0);
    const [valueDescription, setValueDescription] = useState("");
    const optionHots = [{id: 0, value: "true"}, {id: 1, value: "false"}];
    const [listCategories, setListCategories] = useState<Category[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [discounts, setDiscounts] = useState<Discount[]>([])
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const textSuccess = "Thêm Mới Thành Công!";
    const textErrors = "Lỗi Thêm Mới!";
    const router = useRouter();
    function nextProduct(){
        router.push("/product").then();
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        InsertProduct().then();
        // nextProduct();
        setTimeout(nextProduct, 1000)
        // console.log("Product data: ", props.productActive);
    };
    function inputUpdate(): InputUpdateProduct {
        const data ={
            product_input: {
                name: valueName,
                description: valueDescription,
                price: valuePrice,
                thumb: "/",
                hot: valueHot,
                category_id: valueCategory,
                campaign_id: valueCampaign,
                discount_id: valueDiscount,
                priority: valuePriority
            }
        }
        return data;
    }
    async function InsertProduct(){
        try{
            const res = await insertProduct(inputUpdate());
            if(res.code === 200){
               setIsOpenSuccess(true);
                setTimeout(() =>setIsOpenSuccess(false), 2000)
                // props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        }catch (e) {
            setIsOpenError(true);
            setTimeout(() =>setIsOpenError(false), 2000)
        }
    }
    useEffect(() =>{
        async function fetchDiscount() {
            try {
                const res = await getListDiscount(dataInputDiscount());
                if (res.code === 200) {
                    setDiscounts(res.data);
                }
            } catch (e) {
                console.log('error');
            }
        }
        async function fetchCampaign() {
            try {
                const res = await getListCampaign(dataInputCampaign());
                if (res.code === 200) {
                    setCampaigns(res.data);
                }
            } catch (e) {
                console.log('error');
            }
        }
        async function fetchListCategory() {
            try {
                const res = await getListCategory(dataInputColor());
                if (res.code === 200) {
                    setListCategories(res.data);
                }
            } catch (e) {
                console.log('error');
            }
        }
        fetchCampaign().then();
        fetchDiscount().then();
        fetchListCategory().then();
    }, [])
    return<>
        <Layout>
            <p className="font-bold ml-5 text-2xl mt-2">THÊM SẢN PHẨM MỚI</p>
            <form onSubmit={handleSubmit}>
                <div className="input-product">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={valueName}
                        onChange={(e) => setValueName(e.target.value)}
                        required

                    />
                </div>
                <div className="input-product">
                    <label htmlFor="price">Giá</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={valuePrice}
                        onChange={(e) => setValuePrice(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="input-product">
                    <label htmlFor="priority">Ưu tiên</label>
                    <input
                        type="number"
                        id="priority"
                        name="priority"
                        value={valuePriority}
                        onChange={(e) => setValuePriority(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="input-product">
                    <label htmlFor="hot">Hot:</label>
                    <select id="hot" name="hot"value={valueHot} onChange={(e) => {setValueHot(parseInt(e.target.value)); console.log(valueHot)}}>
                        {optionHots.map((hot, index) =>(
                            <option key={index} value={hot.id}>{hot.value}</option>
                        ))}

                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="category">Danh mục</label>
                    <select id="category" name="category" value={valueCategory} onChange={(e) => {setValueCategory(parseInt(e.target.value))}}>
                        {listCategories.map((cam, index)=>(
                            <option value={cam.id} key={index}>{cam.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="campaign">Chiến dịch</label>
                    <select id="campaign" name="campaign" value={valueCampaign} onChange={(e) => {setValueCampaign(parseInt(e.target.value))}}>
                        {campaigns.map((cam, index)=>(
                            <option value={cam.id} key={index}>{cam.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="discount">Giảm giá</label>
                    <select id="discount" name="discount" value={valueDiscount} onChange={(e) => {setValueDiscount(parseInt(e.target.value))}}>
                        {discounts.map((dis, index)=>(
                            <option value={dis.id} key={index}>{dis.discount_code}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        id="description"
                        name="description"
                        value={valueDescription}
                        onChange={(e) => setValueDescription(e.target.value)}
                        required
                    />
                </div>
                {/*//type="submit"*/}
                <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5" >
                    <i className="fa-sharp fa-solid fa-plus" style={{marginRight: "10px"}}></i>
                    Thêm mới
                </button>
            </form>
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
