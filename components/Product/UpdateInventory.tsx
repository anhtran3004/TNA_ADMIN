import {useEffect, useState} from "react";
import {getInventories, getListColor, getListSize, insertInventory, updateInventory} from "@/lib/API";
import {Color, InputInventory, InputUpdateProduct, Inventory, Product, Size} from "@/components/HomeType";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {dataInputSize} from "@/pages/size";
import {dataInputColor} from "@/pages/color";
interface Props{
    productActive: Product
}
export function DefaultDataInventory() : Inventory{
    const data = {
        id: 0,
        name: "",
        size: "",
        quantity: 0,
        size_id: 0,
        color_id: 0,
        product_id: 0
    }
    return data;
}
export default function UpdateInventory(props: Props){
    const [valueColor, setValueColor] = useState(1);
    const [valueSize, setValueSize] = useState(1);
    const [valueQuantity, setValueQuantity] = useState(0);
    const [listColor, setListColor] = useState<Color[]>([]);
    const [listSize, setListSize] = useState<Size[]>([]);
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [inventoryActive, setInventoryActive] = useState<Inventory>(DefaultDataInventory());
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [inventorySelected, setInventorySelected] = useState(-1);
    async function fetchColors() {
        try {
            // console.log("id", id);
            const res = await getListColor(dataInputColor());
            if (res.code === 200) {
                setListColor(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }
    async function fetchSizes() {
        try {
            // console.log("id", id);
            const res = await getListSize(dataInputSize());
            if (res.code === 200) {
                setListSize(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }
    async function fetchInventory() {
        try {
            // console.log("id", id);
            const res = await getInventories(props.productActive.id.toString());
            if (res.code === 200) {
                setInventory(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }
    function inputInsertInventory(): InputInventory {
        const data = {
            product_input: {
                size_id: valueSize,
                color_id: valueColor,
                quantity: valueQuantity
            }
        }
        return data;
    }
    async function InsertInventory(){
        try{
            const res = await insertInventory(inputInsertInventory(), props.productActive.id)
            if(res.code === 200){
                console.log('insert inventory success!');
                setStatusUpdate(randomNumberInRange(1,1000));
            }
        }catch (e){
            console.log('error');
        }
    }
    async function UpdateInventory(){
        try{
            const res = await updateInventory(inputInsertInventory(), props.productActive.id)
            if(res.code === 200){
                console.log('insert inventory success!');
                setStatusUpdate(randomNumberInRange(1,1000));
            }
        }catch (e){
            console.log('error');
        }
    }
    useEffect(() =>{
        fetchColors().then();
        fetchSizes().then();
        fetchInventory().then();

    }, [props.productActive.id, statusUpdate])
    useEffect(() =>{
        if(listColor.length > 0 && listSize.length > 0){
            setValueSize(listSize[0].id);
            setValueColor(listColor[0].id);
        }
    }, [listColor, listSize])
    function handleSubmit(){
        let flag = false;
        for(let i =  0; i <inventory.length; i++){
            if(valueSize === inventory[i].size_id && valueColor === inventory[i].color_id){
                UpdateInventory().then();
                flag = true;
            }
        }
        if(flag === false){
            InsertInventory().then();
        }
    }
    useEffect(() =>{
        async function getInventorySelected(){
            for(let i = 0; i < inventory.length; i++){
                if(inventory[i].id === inventorySelected){
                    setInventoryActive(inventory[i]);
                }
            }
        }
        getInventorySelected().then();
    }, [inventorySelected])
    useEffect(() =>{
        setValueColor(inventoryActive.color_id);
        setValueSize(inventoryActive.size_id);
        setValueQuantity(inventoryActive.quantity);
    }, [inventoryActive])
    return<>
        <div className="update-inventory">
            <div className="">
                <h1 className="font-bold mx-3 pb-1" style={{fontSize: "20px"}}>Inventory</h1>
                {/*<form onSubmit={handleSubmit}>*/}
                <div className="add-quantity-of-inventory">
                    <div className="input-inventory">
                        <label htmlFor="color">Color:</label>
                        <select id="color" name="color" value={valueColor} onChange={(e) => {
                            setValueColor(parseInt(e.target.value))
                        }}>
                            {listColor.map((cam, index) => (
                                <option value={cam.id} key={index}>{cam.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-inventory">
                        <label htmlFor="size">Size:</label>
                        <select id="size" name="size" value={valueSize} onChange={(e) => {
                            setValueSize(parseInt(e.target.value))
                        }}>
                            {listSize.map((cam, index) => (
                                <option value={cam.id} key={index}>{cam.size}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-inventory">
                        <label htmlFor="price">Quantity:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={valueQuantity}
                            onChange={(e) => setValueQuantity(parseInt(e.target.value))}
                        />
                    </div>
                    <button onClick={handleSubmit} className="rounded-md bg-green-600 text-white px-2 py-0.5">Update Inventory</button>
                </div>
                {/*</form>*/}
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
                        (inve.quantity > 0) &&
                        <tr key={index} onClick={() => setInventorySelected(inve.id)}
                            className={(inventorySelected === inve.id) ? "selected-product" : ""}
                        >
                            <td>{index + 1}</td>
                            <td>{inve.name}</td>
                            <td>{inve.size}</td>
                            <td>{inve.quantity}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                {/*<div className="font-bold ml-5 text-2xl mb-3">Tổng số lượng tồn kho của sản phẩm: {totalInventory}</div>*/}
            </div>
        </div>
    </>
}