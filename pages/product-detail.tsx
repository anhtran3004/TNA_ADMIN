import {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import {getListProduct} from "@/lib/API";
import {dataInputProduct, dataOutputProduct} from "@/pages/product";
import {Product} from "@/components/HomeType";
import {useRouter} from "next/router";

export default function ProductDetail() {
    const [products, setProducts] = useState<Product>(dataOutputProduct())
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProduct())
                const status = res.code;

                if (status === 200) {
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].id === parseInt(id + "")){
                            setProducts(res.data[i]);
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
    }, [id])
    useEffect(() => {
        console.log("products", products);
        console.log("po", id);
    }, [products])
    return <>
        <Layout>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">{products.name}</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
            <div className="p-3 flex">
                <p className="bg-gray-400 mr-2 w-20">Name: </p>
                <p className="bg-amber-50 w-60">lk</p>
            </div>
        </Layout>
    </>
}