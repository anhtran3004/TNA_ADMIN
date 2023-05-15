import {useEffect, useState} from "react";
import {Campaign, Category, Discount, InputInsertUser, InputUpdateProduct} from "@/components/HomeType";
import {getListCampaign, getListCategory, getListDiscount, insertProduct, updateProduct} from "@/lib/API";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import {getUsername, insertUser} from "@/lib/API/User";

export default function AddUser(){
    const [valueName, setValueName] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [valueConfirmPassword, setValueConfirmPassword] = useState('');
    const [valueUsername, setValueUsername] = useState('');
    const [valueAddress, setValueAddress] = useState('');
    const [valuePhone, setValuePhone] = useState('');
    const [valueRole, setValueRole] = useState('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const router = useRouter();
    function nextUser(){
        router.push("/user").then();
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(passwordError || usernameError !== ''|| emailError !== ''){
            return;
        }
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
                password: valuePassword
            }
        }
        return data;
    }
    async function handleCheckUsername(){
        const res = await getUsername();
        let dem = 0;
        for(let i = 0; i < res.data.length; i++){
            if(res.data[i].username === valueUsername){
                setUsernameError('Username đã tồn tại');
                dem++;
            }
        }
        if(dem === 0){
            setUsernameError('');
        }
    }
    async function handleCheckEmail(){
        const res = await getUsername();
        let dem = 0;
        for(let i = 0; i < res.data.length; i++){
            if(res.data[i].email === valueEmail){
                setEmailError('Email đã tồn tại');
                dem++;
            }
        }
        if(dem === 0){
            setEmailError('');
        }
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
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target;
        if(value !== valuePassword){
            setPasswordError('Mật khẩu không trùng khớp!')

        }else{
            setPasswordError('');
        }
        setValueConfirmPassword(value);
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
                            required
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
                            onBlur={handleCheckEmail}
                            required
                        />

                    </div>
                    {emailError && <div style={{color:"red", marginLeft:"25px", marginTop:"0", marginBottom:"5px"}}>{emailError}</div>}
                    <div className="input-product">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={valueUsername}
                            onChange={(e) => setValueUsername(e.target.value)}
                            onBlur={handleCheckUsername}
                            required
                        />
                    </div>
                    {usernameError && <div style={{color:"red", marginLeft:"25px", marginTop:"0", marginBottom:"5px"}}>{usernameError}</div>}
                    <div className="input-product">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={valuePassword}
                            onChange={(e) => setValuePassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-product">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={valueConfirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    {passwordError && <div style={{color:"red", marginLeft:"25px", marginTop:"0", marginBottom:"5px"}}>{passwordError}</div>}

                    <div className="input-product">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={valueAddress}
                            onChange={(e) => setValueAddress(e.target.value)}
                            required
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
                            required
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
