import Image from "next/image";
import {InputCampaign, Campaign} from "@/components/HomeType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";

import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebaseConfig";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {updateCampaign} from "@/lib/API/Campaign";
import {GetDefaultCampaign} from "@/pages/product-detail";
import {getListCampaign} from "@/lib/API";
import {formatDate} from "@/components/Campaign/ContentCampain";

interface Props {
    campaignActive: Campaign
    setStatusUpdate: Dispatch<SetStateAction<number>>
}
export function formatDates(date:string){
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
export function UploadImageCampaign(props: Props) {
    const [srcImage, setSrcImage] = useState<string>("/product/no-image.jpg");
    const [isShowPreviewImg, setShowPreviewImg] = useState(false)
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("/product/no-image.jpg");
    const [downloadUrl, setDownLoadUrl] = useState('');
    function inputUpdate(): InputCampaign {
        const data = {
            campaign_input: {
                name: props.campaignActive.name,
                thumb: downloadUrl,
                end_day: formatDates(props.campaignActive.end_day),
                campaign_description: props.campaignActive.campaign_description
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
    useEffect(() =>{
        setSrcImage(props.campaignActive.thumb)
    }, [props.campaignActive.id]);
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
    async function UpdateCampaign(){
        try{
            console.log("id", inputUpdate());
            const res = await updateCampaign(inputUpdate(), props.campaignActive.id);
            if(res.code === 200){
                console.log('update success!');
                props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        }catch (e) {
            console.log('error');
        }
    }
    useEffect(() =>{
        console.log("download URL", downloadUrl);
        UpdateCampaign().then();
        setSrcImage(downloadUrl);
    }, [downloadUrl])
    return<>
        <div className="pl-5 border-l-4 border-indigo-500">
            <p className="font-bold">Update Campaign Image:</p>
            <Image src={srcImage} alt="Preview" width={200} height={100}/>
            {/*{props.previewURL && <Image src={props.previewURL} alt="Preview" width={200} height={100}/>}*/}
            <button onClick={() => setShowPreviewImg(true)} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload</button>

        </div>
        {isShowPreviewImg && (
            <Modal>
                <div className="error-modal">
                    <div className="background-error-modal" onClick={() => setShowPreviewImg(false)}></div>
                    <div className="inner-image-modal">
                        {previewURL && <Image src={previewURL} alt="Preview" width={200} height={100}/>}
                        <label htmlFor="chooseFile" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2">Chọn
                            tệp...</label>
                        <input className="hidden" type="file" accept="image/*" id="chooseFile"
                               onChange={handleImageChange}/>
                        <button onClick={() =>{handleUpload().then()}} className="rounded-md bg-green-600 text-white p-2 mt-2">Upload
                            Image
                        </button>
                        {/*{downloadUrl && (*/}
                        {/*    <p>{downloadUrl}</p>*/}
                        {/*)}*/}
                    </div>
                </div>
            </Modal>
        )}
    </>
}