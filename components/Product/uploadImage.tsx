import Image from "next/image";
import {InputUpdateProduct, Product} from "@/components/HomeType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import {updateProduct} from "@/lib/API";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebaseConfig";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
interface Props {
    productActive: Product
    setStatusUpdate: Dispatch<SetStateAction<number>>
}

export function UploadImage(props: Props) {
    const [srcImage, setSrcImage] = useState<string>("/product/no-image.jpg");
    const [isShowPreviewImg, setShowPreviewImg] = useState(false)
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("/product/no-image.jpg");
    const [downloadUrl, setDownLoadUrl] = useState('');
    const [progressHandler, setProgressHandler] = useState<number>(0);

    useEffect(() =>{
        setSrcImage(props.productActive.thumb)
    }, [props.productActive.id]);
    function inputUpdate(): InputUpdateProduct {
        const data ={
            product_input: {
                name: props.productActive.name,
                description: props.productActive.description,
                price: props.productActive.price,
                thumb: downloadUrl,
                hot: props.productActive.hot,
                category_id: props.productActive.category_id,
                campaign_id: props.productActive.campaign_id,
                discount_id: props.productActive.discount_id,
                priority: props.productActive.priority
            }
        }
        return data;
    }
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
    }
    useEffect(() => {
        console.log("Image preview", image);
    }, [image])
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
                    setProgressHandler(progress);
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
    }
    async function UpdateProduct(){
        try{
            console.log("download URL", downloadUrl);
            const res = await updateProduct(inputUpdate(), props.productActive.id);
            if(res.code === 200){
                console.log('update success!');
                props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        }catch (e) {
            console.log('error');
        }
    }
    useEffect(() =>{
        UpdateProduct().then();
        setSrcImage(downloadUrl);
    }, [downloadUrl])
    return<>
    <div className="pl-5 border-l-4 border-indigo-500">
        <p className="font-bold">Update product Image:</p>
        <Image src={srcImage} alt="Preview" width={200} height={100}/>
        {/*{props.previewURL && <Image src={props.previewURL} alt="Preview" width={200} height={100}/>}*/}
        <button onClick={() => setShowPreviewImg(true)} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload</button>
        {/*{props.downloadUrl && (*/}
        {/*    <p>{props.downloadUrl}</p>*/}
        {/*)}*/}
    </div>
        {isShowPreviewImg && (
            <Modal>
                <div className="error-modal">
                    <div className="background-error-modal" onClick={() => setShowPreviewImg(false)}></div>
                    <div className="inner-image-modal">
                        {previewURL && <Image src={previewURL} alt="Preview" width={200} height={100}/>}
                        <ProgressBar now={progressHandler} />
                        <label htmlFor="chooseFile" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2">Chọn
                            tệp...</label>
                        <input className="hidden" type="file" accept="image/*" id="chooseFile"
                               onChange={handleImageChange}/>
                        <button onClick={() =>{handleUpload().then()}} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload
                            Image
                        </button>
                        {/*{props.downloadUrl && (*/}
                        {/*    <p>{props.downloadUrl}</p>*/}
                        {/*)}*/}
                    </div>
                </div>
            </Modal>
        )}
    </>
}