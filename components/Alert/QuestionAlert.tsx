import React, {Dispatch, SetStateAction} from "react";
import Image from "next/image";
interface Props {
    textError :string;
    setIsOpenQuestionAlert: Dispatch<SetStateAction<boolean>>;
    setOkListener: () => void;
}
export default function QuestionAlert(props:Props) {
    return <>
        <div className="error-modal">
            <div className="background-error-modal"></div>
            <div className="inner-error-modal">
                <div className="icon-error">
                    <Image src="/product/error-image.png" alt="" width={142} height={100} />
                </div>
                <p className="error-text">{props.textError}</p>
                <div className="action-handle-error">
                    <p onClick={() => props.setIsOpenQuestionAlert(false)}>Hủy bỏ</p>
                    <p onClick={() => {props.setOkListener()}}>OK</p>
                </div>
            </div>
        </div>
    </>
}