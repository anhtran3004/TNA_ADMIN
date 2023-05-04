import {Campaign, Category, Color, Discount, InputUpdateProduct, Inventory, Product, Size} from "@/components/HomeType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    getInventories,
    getListCampaign,
    getListCategory,
    getListColor,
    getListDiscount, getListSize,
    updateProduct
} from "@/lib/API";
import {GetDefaultCampaign, GetDefaultCategory, GetDefaultDiscount} from "@/pages/product-detail";
import UpdateInventory from "@/components/Product/UpdateInventory";

const _ = require('lodash');

interface Props {
    productActive: Product,
    setStatusUpdate: Dispatch<SetStateAction<number>>
}

export function randomNumberInRange(min: number, max: number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function UpdateProduct(props: Props) {

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [discounts, setDiscounts] = useState<Discount[]>([])
    const [campaign, setCampaign] = useState<Campaign>(GetDefaultCampaign())
    const [discount, setDiscount] = useState<Discount>(GetDefaultDiscount())
    const [category, setCategory] = useState<Category>(GetDefaultCategory())
    const [valueHot, setValueHot] = useState(props.productActive.hot);
    const [valueCategory, setValueCategory] = useState(-1);
    const [valueCampaign, setValueCampaign] = useState(-1);
    const [valueDiscount, setValueDiscount] = useState(-1);
    const [valueName, setValueName] = useState<string>(props.productActive.name);
    const [valuePrice, setValuePrice] = useState(props.productActive.price);
    const [valuePriority, setValuePriority] = useState(props.productActive.priority);
    const [valueDescription, setValueDescription] = useState(props.productActive.description);
    const [listCategories, setListCategories] = useState<Category[]>([]);
    const optionHots = [{id: 0, value: "true"}, {id: 1, value: "false"}];
    useEffect(() => {
        async function fetchCampaign() {
            try {
                const res = await getListCampaign();
                if (res.code === 200) {
                    setCampaigns(res.data);
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].id === props.productActive.campaign_id) {
                            setCampaign(res.data[i]);
                        }
                    }
                }
            } catch (e) {
                console.log('error');
            }
        }

        async function fetchDiscount() {
            try {
                const res = await getListDiscount();
                if (res.code === 200) {
                    setDiscounts(res.data);
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].id === props.productActive.discount_id) {
                            setDiscount(res.data[i]);
                        }
                    }
                }
            } catch (e) {
                console.log('error');
            }
        }

        async function fetchListCategory() {
            try {
                const res = await getListCategory();
                if (res.code === 200) {
                    setListCategories(res.data);
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].id === props.productActive.category_id) {
                            setCategory(res.data[i]);
                        }
                    }
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchCampaign().then();
        fetchDiscount().then();
        fetchListCategory().then();
        setValueName(props.productActive.name);
        setValuePrice(props.productActive.price);
        setValuePriority(props.productActive.priority);
        setValueDescription(props.productActive.description);
    }, [props.productActive.id])
    useEffect(() => {
        setValueCategory(category.id);
        setValueCampaign(campaign.id);
        setValueDiscount(discount.id);
        setValueHot(props.productActive.hot)
    }, [category, campaign, discount])

    function inputUpdate(): InputUpdateProduct {
        const data = {
            product_input: {
                name: valueName,
                description: valueDescription,
                price: valuePrice,
                thumb: props.productActive.thumb,
                hot: valueHot,
                category_id: valueCategory,
                campaign_id: valueCampaign,
                discount_id: valueDiscount,
                priority: valuePriority
            }
        }
        return data;
    }

    async function UpdateProduct() {
        try {
            const res = await updateProduct(inputUpdate(), props.productActive.id);
            if (res.code === 200) {
                console.log('update success!');
                props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        } catch (e) {
            console.log('error');
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        UpdateProduct().then();
        // console.log("Product data: ", props.productActive);
        // TODO: submit product data to backend or perform other actions
    };
    return <div className="mb-10">
        <p className="font-bold ml-5">UPDATE PRODUCT DETAIL</p>
        <form onSubmit={handleSubmit} className="update-product-detail">
            <div>
                <div className="input-product">
                    <label htmlFor="name">Name:</label>
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
                    <label htmlFor="price">Price:</label>
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
                    <label htmlFor="priority">Priority:</label>
                    <input
                        type="number"
                        id="priority"
                        name="priority"
                        value={valuePriority}
                        onChange={(e) => setValuePriority(parseInt(e.target.value))}
                        required
                    />
                </div>
                {/*<div className="input-product">*/}
                {/*    <label htmlFor="status">Status:</label>*/}
                {/*    <select id="status" name="status">*/}
                {/*        {booleans.map((boolean, index) => (*/}
                {/*            <option value={props.productActive.status} key={index}>{boolean}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="input-product">
                    <label htmlFor="hot">Hot:</label>
                    <select id="hot" name="hot" value={valueHot} onChange={(e) => {
                        setValueHot(parseInt(e.target.value));
                        console.log(valueHot)
                    }}>
                        {optionHots.map((hot, index) => (
                            <option key={index} value={hot.id}>{hot.value}</option>
                        ))}

                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={valueCategory} onChange={(e) => {
                        setValueCategory(parseInt(e.target.value))
                    }}>
                        {listCategories.map((cam, index) => (
                            <option value={cam.id} key={index}>{cam.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="campaign">Campaign:</label>
                    <select id="campaign" name="campaign" value={valueCampaign} onChange={(e) => {
                        setValueCampaign(parseInt(e.target.value))
                    }}>
                        {campaigns.map((cam, index) => (
                            <option value={cam.id} key={index}>{cam.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="discount">Discount:</label>
                    <select id="discount" name="discount" value={valueDiscount} onChange={(e) => {
                        setValueDiscount(parseInt(e.target.value))
                    }}>
                        {discounts.map((dis, index) => (
                            <option value={dis.id} key={index}>{dis.discount_code}</option>
                        ))}
                    </select>
                </div>
                <div className="input-product">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={valueDescription}
                        onChange={(e) => setValueDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
            <UpdateInventory productActive={props.productActive} />
            <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Product
            </button>
        </form>
    </div>;
}