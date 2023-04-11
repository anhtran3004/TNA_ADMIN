import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import {Category, InputProduct, Product} from "@/components/HomeType";
import {getListCategory, getListProduct} from "@/lib/API";
import Image from "next/image";

export function dataInputProduct(): InputProduct {
    const data = {
        filter: {
            product_id: [],
            category_id: [],
            price: {
                min: 0,
                max: 10000000
            }
        },
        sort: {
            field: "id",
            order: "ASC"
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
        category: ["hot", "category"],
        thumb: ""
    }
    return data;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([])
    const [productActive, setProductActive] = useState<Product>(dataOutputProduct())
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("/product/no-image.jpg");
    const [productSelected, setProductSelected] = useState<number>(-1);
    const [listCategories, setListCategories] = useState<Category[]>([])
    const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewURL(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleUpload = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        try {
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            // onUpload(data.imageUrl);
        } catch (error) {
            console.error(error);
        }
    };
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
        async function fetchListCategory(){
            try{
                const res = await getListCategory();
                if(res.code === 200){
                    setListCategories(res.data);
                }
            }catch (e){
                console.log('error');
            }
        }

        fetchProductData().then();
        fetchListCategory().then();
    }, [])
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProductActive((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Product data: ", productActive);
        // TODO: submit product data to backend or perform other actions
    };
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Layout>
            <div className="flex justify-evenly">
                <table border={1}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} onClick={() => setProductSelected(product.id)} className={(productSelected === product.id) ? "selected-product" : ""}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                                <div
                                    dangerouslySetInnerHTML={{__html: product.description}}
                                />
                                {/*<Image src={BASE_IMAGE_URL + product.thumb + ".png?alt=media&token=ee0c7490-09c6-4ded-b9bb-aab17d9e17ee"} alt="" width={200} height={100} />*/}
                            </td>
                            <td>{product.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                            })}</td>
                            <td className="flex w-56  items-center border-none justify-evenly">
                                <button className="rounded-full text-white bg-red-800 w-20 px-2">Delete</button>
                                <button className="rounded-full text-white bg-green-600 w-22 px-2">View Detail</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pl-5 border-l-4 border-indigo-500">
                    <p className="font-bold">Update product Image:</p>
                    {previewURL && <Image src={previewURL} alt="Preview" width={200} height={100}/>}
                    <label htmlFor="chooseFile" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2">Chọn tệp...</label>
                    <input className="hidden" type="file" accept="image/*" id="chooseFile" onChange={handleImageChange}/>
                    <button onClick={handleUpload} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload Image</button>
                </div>
            </div>
            <div>
                <p className="font-bold ml-5">UPDATE PRODUCT DETAIL</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-product">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productActive.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productActive.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={productActive.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category" value={productActive.category} onChange={handleInputChange}>

                            {/*<option value="hot">Hot</option>*/}
                            {/*<option value="favorite">Favorite</option>*/}
                            {listCategories.map((cate, index) =>(
                                <option value={cate.id} key={index}>{cate.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Product</button>
                </form>
            </div>
    </Layout>

    );
}