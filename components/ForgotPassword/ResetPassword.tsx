import {useForm} from "react-hook-form";
import React, {Dispatch, SetStateAction, useState} from "react";
import {resetPassword} from "../../lib/Auth/API";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
const MySwal = withReactContent(Swal);
const alertContent = () => {
    MySwal.fire({
        title: "Chúc Mừng!",
        text: "Cập nhật mật khẩu thành công!",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};
interface Props {
    email: string,
    setIsShowResetPassword: Dispatch<SetStateAction<boolean>>
}

export default function ResetPassword(props: Props){
    const {register, handleSubmit, errors} = useForm();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [valueConfirmPassword, setValueConfirmPassword] = useState('')
    const router = useRouter();
    const onSubmit = async () => {
        if(passwordError !== ''){
            return;
        }
        try {
            const res = await resetPassword(props.email, password);
            if (res.code === 200) {
                console.log('reset password success');
                alertContent();
                setTimeout(() => router.push('/login').then(), 1000);
            }
        } catch (e) {
            console.log('error', e)
        }
    };
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target;

        if(value !== password){
            setPasswordError('Mật khẩu không trùng khớp!')

        }else{
            setPasswordError('');
        }
        setValueConfirmPassword(value);
    }

    return <>
        <section className="form-page" style={{position: "relative"}}>
            <h2 onClick={() => props.setIsShowResetPassword(false)} style={{width: "500px",  margin: "auto", marginBottom: "15px", fontSize:"25px", color:"blue"}}>Trở
                lại</h2>
            <div className="container" style={{width: "500px"}}>
                <div className="form-block">
                    <h2 className="form-block__title">Bạn hãy cập nhật mật khẩu mới.</h2>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__input-row">
                            <input
                                className="form__input"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__input-row">
                            <input
                                className="form__input"
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={valueConfirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        {passwordError && <div style={{color:"red", marginLeft:"10px",marginBottom:"5px"}}>{passwordError}</div>}

                        <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Xác nhận</button>
                    </form>
                </div>
            </div>
        </section>
    </>
}