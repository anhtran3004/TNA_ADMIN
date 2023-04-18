import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import {Category, InputProduct, Product} from "@/components/HomeType";
import {getListCategory, getListProduct} from "@/lib/API";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebaseConfig";
import {UpdateProduct} from "@/components/Product/UpdateProduct";
import {UploadImage} from "@/components/Product/uploadImage";
import {ContentProduct} from "@/components/Product/ContentProduct";
import {HeaderTable} from "@/components/Product/HeaderTable";
import {useRouter} from "next/router";

// import storage = firebase.storage;

export function dataInputProduct() {
    const data : InputProduct = {
        filter: {
            product_id: [],
            category_id: [],
            price: {
                min: 0,
                max: 10000000
            }
        },
        sort: {
            field: "priority",
            order: "DESC"
        },
        pagination: {
            page: 0,
            perPage: 1000
        }
    }
    return data;
}
export function dataOutputProduct(): Product {
    const data = {
        id: 0,
        name: "",
        description: "",
        price: 0,
        thumb: "",
        status: 0,
        hot: 0,
        import_date: "",
        update_date: "",
        category_id: 0,
        campaign_id: 0,
        discount_id: 0,
        favorite: 0,
        priority: 0
    }
    return data;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([])
    const [productActive, setProductActive] = useState<Product>(dataOutputProduct())
    const [productSelected, setProductSelected] = useState<number>(-1);
    const [statusProduct, setStatusProduct] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
    const router = useRouter();
    function nextAddProduct(){
        router.push("/add-product").then();
    }
    useEffect(() => {

        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProduct())
                const status = res.code;
                if (status === 200) {
                    setProducts(res.data);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }
        console.log("statusUpdate", statusUpdate);
        fetchProductData().then();
    }, [statusProduct,statusUpdate])
    useEffect(() =>{
        async function getProductSelected(){
            for(let i = 0; i < products.length; i++){
                if(products[i].id === productSelected){
                    setProductActive(products[i]);
                }
            }
        }
        getProductSelected().then();
    }, [productSelected])
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}} onClick={nextAddProduct}>Add New Product</div>
            </div>
            <div className="flex justify-evenly">
                <table border={1}>
                    <HeaderTable/>
                    <tbody>
                    {products.map((product) => (
                        <ContentProduct key={product.id} onClick={() => setProductSelected(product.id)}
                                        productSelected={productSelected} product={product} id={product.id} setStatusProduct={setStatusProduct}/>
                    ))}
                    </tbody>
                </table>
                <UploadImage  productActive={productActive} setStatusUpdate={setStatusUpdate}/>
            </div>
            <UpdateProduct  productActive={productActive} setStatusUpdate={setStatusUpdate}/>
        </Layout>

    );
}