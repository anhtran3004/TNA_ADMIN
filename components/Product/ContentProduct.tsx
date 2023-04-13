import {Product} from "@/components/HomeType";
import Link from "next/link";
import {Dispatch, SetStateAction, useEffect} from "react";
import {deleteProduct} from "@/lib/API";
interface Props{
    onClick: () => void,
    productSelected: number,
    product: Product,
    id: number,
    setStatusProduct: Dispatch<SetStateAction<number>>
}
export function ContentProduct(props: Props) {

        async function DeleteProduct() {
            try{
                const res = await deleteProduct([props.id]);
                if(res.code === 200){
                    console.log('deleted success!');
                    props.setStatusProduct(props.id);
                }
            }catch (e){
                console.log('error');
            }

        }
    return <tr onClick={props.onClick}
               className={(props.productSelected === props.product.id) ? "selected-product" : ""}>
        <td>{props.product.id}</td>
        <td>{props.product.name}</td>
        <td>
            <div
                dangerouslySetInnerHTML={{__html: props.product.description}}
            />
        </td>
        <td>{props.product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        })}</td>
        <td className="flex w-56  items-center border-none justify-evenly">
            <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={DeleteProduct}>Delete</button>
            <Link href={"/product-detail?id=" + props.product.id}>
                <button className="rounded-full text-white bg-green-600 w-22 px-2">View Detail
                </button>
            </Link>

        </td>
    </tr>;
}