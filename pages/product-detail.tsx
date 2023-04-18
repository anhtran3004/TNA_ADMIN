import {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import {
    getInventories,
    getInventory,
    getListCampaign,
    getListCategory,
    getListDiscount,
    getListProduct
} from "@/lib/API";
import {dataInputProduct, dataOutputProduct} from "@/pages/product";
import {Campaign, Category, Discount, Inventory, Product} from "@/components/HomeType";
import {useRouter} from "next/router";
import Image from "next/image";

export function GetDefaultCategory() {
    const data = {
        id: 0,
        categoryName: '',
        sku: '',
        status: 0,
    }
    return data
}

export function GetDefaultCampaign() {
    const data = {
        id: 0,
        name: '',
        thumb: '',
        sku: '',
        start_day: '',
        end_day: '',
        status: 0,
        campaign_description: ""
    }
    return data
}

export function GetDefaultDiscount() {
    const data = {
        id: 0,
        discount_code: '',
        discount_type: '',
        discount_value: 0,
        start_day: '',
        end_day: '',
        status: 0,
    }
    return data
}
export default function ProductDetail() {
    const [products, setProducts] = useState<Product>(dataOutputProduct())
    const router = useRouter();
    const [category, setCategory] = useState<Category>(GetDefaultCategory())
    const [campaign, setCampaign] = useState<Campaign>(GetDefaultCampaign())
    const [discount, setDiscount] = useState<Discount>(GetDefaultDiscount())
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [totalInventory, setTotalInventory] = useState(0);
    const id = router.query.id;
    useEffect(() => {
        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProduct())
                const status = res.code;

                if (status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].id === parseInt(id + "")) {
                            setProducts(res.data[i]);
                            fetchCategory(res.data[i].category_id).then();
                            fetchCampaign(res.data[i].campain_id).then();
                            fetchDiscount(res.data[i].discount_id).then();
                        }
                    }
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchProductData().then();
        fetchInventory().then();
    }, [id])

    async function fetchCategory(id: number) {
        try {
            const res = await getListCategory();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === id) {
                        setCategory(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    async function fetchCampaign(id: number) {
        try {
            const res = await getListCampaign();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === id) {
                        setCampaign(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    async function fetchDiscount(id: number) {
        try {
            const res = await getListDiscount();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === id) {
                        setDiscount(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    async function fetchInventory() {
        try {
            // console.log("id", id);
            const res = await getInventories(id);
            if (res.code === 200) {
                setInventory(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() => {
        let total = 0;
        for(let i = 0; i < inventory.length; i++){
            total += inventory[i].quantity;
        }
        setTotalInventory(total);
    }, [inventory])

    return <>
        <Layout>
            <div className="mb-3">
                <h1 className="text-3xl font-bold my-4 bg-amber-50">Product Information</h1>
            <table border={1} className="ml-3 p-0">
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{products.name}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{products.price}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{products.description}</td>
                </tr>
                <tr>
                    <td>Image</td>
                    <td>
                        <Image src={products.thumb} alt="" width={200} height={100}/>
                    </td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{category.categoryName}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>
                        {(products.status === 1) ? "true" : "false"}
                    </td>
                </tr>
                <tr>
                    <td>Trending</td>
                    <td>
                        {(products.hot === 1) ? "true" : "false"}
                    </td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td>{discount.discount_code}</td>
                </tr>
                <tr>
                    <td>Campaign</td>
                    <td>{campaign.name}</td>
                </tr>
                <tr>
                    <td>Import Date</td>
                    <td>{products.import_date}</td>
                </tr>
                <tr>
                    <td>Update Date</td>
                    <td>{products.update_date}</td>
                </tr>
                <tr>
                    <td>Favorite</td>
                    <td>
                        {(products.favorite === 1) ? "true" : "false"}
                    </td>
                </tr>
                <tr>
                    <td>Priority</td>
                    <td>{products.priority}</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className="mt-15 bg-white">
                <h1 className="text-3xl font-bold my-4 bg-amber-50 py-1">Inventory</h1>
                <table border={1} className="ml-3">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventory.map((inve, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{inve.name}</td>
                            <td>{inve.size}</td>
                            <td>{inve.quantity}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                <div className="font-bold ml-5 text-2xl mb-3">Tổng số lượng tồn kho của sản phẩm: {totalInventory}</div>
            </div>
        </Layout>
    </>
}