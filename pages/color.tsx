import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {deleteColor, deleteProduct, getListColor, updateColor} from "@/lib/API";
import {Color} from "@/components/HomeType";
import {useEffect, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
export function DefaultColorData(): Color{
    const data ={
        id: 0,
        name: "",
        status: 0,
    }
    return data;
}
export default function Color() {
    const router = useRouter()
    const [listColor, setListColor] = useState<Color[]>([]);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const textError = "Bạn có chắc chắn muốn xóa màu này không?";
    const [colorId, setColorId] = useState(0)
    const [statusColor, setStatusColor] = useState(0)
    const [valueColor, setValueColor] = useState("");
    const [colorSelected, setColorSelected] = useState<Color>(DefaultColorData());

    async function DeleteColor() {
        try{
            const res = await deleteColor([colorId]);
            if(res.code === 200){
                console.log('deleted success!');
                setStatusColor(colorId);
            }
        }catch (e){
            console.log('error');
        }

    }
    async function UpdateColor() {
        try{
            const res = await updateColor(valueColor, colorSelected.id);
            if(res.code === 200){
                console.log('updated success!');
                setStatusColor(randomNumberInRange(1,1000));
            }
        }catch (e){
            console.log('error');
        }

    }
    function nextColorNew() {
        router.push("/new-router").then();
    }

    async function fetchColors() {
        try {
            // console.log("id", id);
            const res = await getListColor();
            if (res.code === 200) {
                setListColor(res.data);
                // setStatusColor(randomNumberInRange(1,1000));
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === colorId) {
                        setColorSelected(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() =>{
        fetchColors().then();
    }, [statusColor,colorId])
    useEffect(() =>{
        setValueColor(colorSelected.name);
    }, [colorSelected])

    return <>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}}
                     onClick={nextColorNew}>Add New Product
                </div>
            </div>
            <table border={1} style={{width: "500px", marginLeft: "50px"}}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Color</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {listColor.map((color, index) => (
                    <tr key={index} onClick={() => setColorId(color.id)}
                        className={(colorId === color.id) ? "selected-product" : ""}
                    >
                        <td>{index + 1}</td>
                        <td>{color.name}</td>
                        <td>
                            <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {setIsOpenDeleteProductAlert(true); setColorId(color.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="update-color">
                <h2 className=" font-bold text-2xl ml-5">Update color:</h2>
                <div className="input-product">
                    <label htmlFor="priority">Color:</label>
                    <input
                        className="shadow-gray-400 border-2"
                        type="text"
                        id="priority"
                        name="priority"
                        value={valueColor}
                        onChange={(e) => setValueColor(e.target.value)}
                    />

                </div>
                <button onClick={UpdateColor} className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Product
                </button>
            </div>
        </Layout>
        {isOpenDeleteProductAlert && (
            <Modal>
                <QuestionAlert textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                               setOkListener={DeleteColor}/>
            </Modal>
        )}
    </>
}