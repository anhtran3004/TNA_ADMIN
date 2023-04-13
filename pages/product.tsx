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

// import storage = firebase.storage;

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
        favorite: 0,
        priority: 0
    }
    return data;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([])
    const [productActive, setProductActive] = useState<Product>(dataOutputProduct())
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("/product/no-image.jpg");
    const [downloadUrl, setDownLoadUrl] = useState('')
    const [productSelected, setProductSelected] = useState<number>(-1);
    const [listCategories, setListCategories] = useState<Category[]>([]);
    const [statusProduct, setStatusProduct] = useState(-1);
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
        if(image){
            // const storage = getStorage();
            const name = image.name
            const storageRef = ref(storage, `images/${name}`);

            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log('error', error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // url is download url of file
                        setDownLoadUrl(url);
                    });
                }
            );
        }else{
            console.log('File not found');
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
    }, [statusProduct])
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
                    <HeaderTable/>
                    <tbody>
                    {products.map((product) => (
                        <ContentProduct key={product.id} onClick={() => setProductSelected(product.id)}
                                        productSelected={productSelected} product={product} id={product.id} setStatusProduct={setStatusProduct}/>
                    ))}
                    </tbody>
                </table>
                <UploadImage previewURL={previewURL} onChange={handleImageChange} onClick={handleUpload}
                             downloadUrl={downloadUrl}/>
            </div>
            <UpdateProduct onSubmit={handleSubmit} productActive={productActive} onChange={handleInputChange}
                           categories={listCategories} callbackFn={(cate, index) => (
                <option value={cate.id} key={index}>{cate.categoryName}</option>
            )}/>
        </Layout>

    );
}