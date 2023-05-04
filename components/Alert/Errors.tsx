import Image from "next/image";
interface Props{
    textError: string
}
export default function Errors(props: Props){
    return<>
        <div className="error-modal">
            {/*<div className="background-error-modal"></div>*/}
            <div className="inner-success">
                <Image src="/Alert/error.png" alt="" width={20} height={20}/>
                <p className="text-red-600">{props.textError}</p>
            </div>
        </div>
    </>
}