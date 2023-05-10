import {Dispatch, SetStateAction} from "react";
import Image from "next/image";
interface Props {
    textError :string;
    setIsCloseAlert: Dispatch<SetStateAction<boolean>>;
}
export default function ErrorAlert(props:Props) {
    return <>
        <div className="error-modal">
            <div className="background-error-modal"></div>
            <div className="inner-error-modal">
                <div className="icon-error">
                    <Image src="/product/error-image.png" alt="" width={142} height={100} />
                </div>
                <p className="error-text">{props.textError}</p>
                <p className="close-error-alert" onClick={() => props.setIsCloseAlert(false)}>OK</p>
            </div>
        </div>
    </>
}