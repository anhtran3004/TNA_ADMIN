import Image from "next/image";
interface Props{
    textSuccess: string
}
export default function Success(props: Props){
    return<>
        <div className="error-modal">
            {/*<div className="background-error-modal"></div>*/}
            <div className="inner-success">
                <Image src="/Alert/success.png" alt="" width={25} height={20}/>
                <p className="text-white">{props.textSuccess}</p>
            </div>
        </div>
    </>
}