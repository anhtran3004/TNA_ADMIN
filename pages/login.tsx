
import Link from 'next/link';
import { useForm } from "react-hook-form";

import {useEffect, useState} from "react";

import {useRouter} from "next/router";

import Success from "../components/Alert/Success";
import Errors from "../components/Alert/Errors";
import {InputLogin} from "@/components/HomeType";
import {login} from "@/lib/API/Auth";
import Layout from "@/components/Layout";

type LoginMail = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [valueUsername, setValueUsername] = useState('');
    const [valuePassword, setValuePassword] = useState('')
    const { register, handleSubmit } = useForm();
    const [accessToken, setAccessToken] = useState('');
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const router = useRouter();

    // const onSubmit = async (data: LoginMail) => {
    //   const res = await postData(`${server}/api/login`, {
    //     email: data.email,
    //     password: data.password
    //   });
    //
    //   console.log(res);
    // };
    const onSubmit = () =>{
        // Login().then();
    }
    function RunLogin(){
        Login().then()

    }
    function inputLogin() : InputLogin{
        const data = {
            username: valueUsername,
            password: valuePassword
        }
        return data;
    }
    // useEffect(() =>{
    async function Login(){
        try {
            const res = await login(inputLogin())
            if(res.code === 200){
                console.log("Login success! ", res.data);
                // setAccessToken(res.data.accessToken);
                localStorage.setItem("accessToken", res.data.accessToken)
                setTextSuccess('Login success!');
                setIsOpenSuccess(true);
                setTimeout(() => router.push('/'), 3000)
            }
        }catch (e) {
            console.log('error');
            setTextErrors('Login error!');
            setIsOpenError(true);
            setTimeout(() => setIsOpenError(false), 2000)
        }
    }
    // },[])
    return <>
            <section className="form-page">
                <div className="container" style={{width:"500px"}}>
                    <div className="form-block">
                        <h2 className="form-block__title">Đăng nhập</h2>
                        <form className="form" onSubmit={handleSubmit(onSubmit)} >
                            <div className="form__input-row">
                                <input
                                    className="form__input"
                                    placeholder="Username"
                                    type="text"
                                    name="email"
                                    value={valueUsername}
                                    onChange={(e) => setValueUsername(e.target.value)}
                                    // ref={register({
                                    //   required: true
                                    // })}
                                    required
                                />
                            </div>

                            <div className="form__input-row">
                                <input
                                    className="form__input"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={valuePassword}
                                    onChange={(e) => setValuePassword(e.target.value)}
                                    // ref={register({ required: true })}
                                />
                            </div>
                            <div className="form__info">
                                <a href="/forgot-password" className="form__info__forgot-password">Quên mật khẩu?</a>
                            </div>
                            <button type="submit" onClick={RunLogin} className="btn btn--rounded btn--yellow btn-submit">Đăng nhập</button>

                        </form>
                    </div>

                </div>
            </section>
        {isOpenSuccess && (
            // <Modal>
            <Success textSuccess={textSuccess} />
            // </Modal>
        )}
        {isOpenError && (
            // <Modal>
            <Errors textError={textErrors} />
            // </Modal>
        )}
    </>
}

export default LoginPage
