import { useForm } from "react-hook-form";
import {useState} from "react";
import {forgotPassword} from "../lib/Auth/API";
import VerifyOtp from "../components/ForgotPassword/VerifyOtp";

const ForgotPassword = () => {
    const { register, handleSubmit, errors } = useForm();
    const [email, setEmail] = useState('');
    const [isShowOtp, setIsShowOtp] = useState(false);

    const onSubmit = async () => {
        try{
            const res = await forgotPassword(email);
            if(res.code === 200){
                console.log('send otp success');
                setIsShowOtp(true);
            }
        }catch (e) {
            console.log('error', e)
        }
    };

    return (
        <>
            {!isShowOtp ?
                <section className="form-page">
                    <div className="container" style={{width: "500px"}}>
                        <div className="form-block">
                            <h2 className="form-block__title">Forgot your password?</h2>
                            <p className="form-block__description">Enter your email or phone number and recover your account</p>
                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        placeholder="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Send OTP</button>
                            </form>
                        </div>
                    </div>
                </section>
                :
                <VerifyOtp email={email} setIsShowOtp={setIsShowOtp}/>
            }
        </>
    )
}

export default ForgotPassword