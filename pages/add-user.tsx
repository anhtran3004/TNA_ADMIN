import {useEffect, useState} from "react";
import {Campaign, Category, Discount, InputInsertUser, InputUpdateProduct} from "@/components/HomeType";
import {getListCampaign, getListCategory, getListDiscount, insertProduct, updateProduct} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import {insertUser} from "@/lib/API/User";

export default function AddUser(){
    const [valueName, setValueName] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [valueUsername, setValueUsername] = useState('');
    const [valueAddress, setValueAddress] = useState('');
    const [valuePhone, setValuePhone] = useState('');
    const [valueRole, setValueRole] = useState('');
    const router = useRouter();
    function nextUser(){
        router.push("/user").then();
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        InsertUser().then();
        // nextProduct();
        setTimeout(nextUser, 1000)
        // console.log("Product data: ", props.productActive);
    };
    function inputInsert(): InputInsertUser {
        const data ={
            user_input: {
                email: valueEmail,
                name: valueName,
                phone: valuePhone,
                address: valueAddress,
                username: valueUsername,
                password: valuePassword,
                role: valueRole
            }
        }
        return data;
    }
    async function InsertUser(){
        try{
            const res = await insertUser(inputInsert());
            if(res.code === 200){
                console.log('update success!');
                // props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        }catch (e) {
            console.log('error');
        }
    }
    return<>
        <Layout>
            <p className="font-bold ml-5">UPDATE PRODUCT DETAIL</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="input-product">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={valueName}
                            onChange={(e) => setValueName(e.target.value)}

                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={valueEmail}
                            onChange={(e) => setValueEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={valueUsername}
                            onChange={(e) => setValueUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={valueAddress}
                            onChange={(e) => setValueAddress(e.target.value)}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="phone">Phone number:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={valuePhone}
                            onChange={(e) => setValuePhone(e.target.value)}
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={valueRole}
                            onChange={(e) => setValueRole(e.target.value)}
                        />
                    </div>
                </div>
                {/*//type="submit"*/}
                <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5" >Update Product
                </button>
            </form>
        </Layout>

    </>
}
