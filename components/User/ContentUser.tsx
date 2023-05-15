import Link from "next/link";
import {InputBlockUser, Product, User} from "@/components/HomeType";
import {Dispatch, SetStateAction, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {blockUser} from "@/lib/API/User";
import {formatDates} from "@/pages/user";
import {randomNumberInRange} from "@/components/Product/UpdateProduct";
interface Props{
    onClick: () => void,
    userSelected: number,
    user: User,
    index: number,
    id: number,
    setStatusUser: Dispatch<SetStateAction<number>>
}
export default function ContentUser(props: Props){
    const [isOpenBlockUserAlert, setIsOpenBlockUserAlert] = useState(false);
    const [isOpenUnBlockUserAlert, setIsOpenUnBlockUserAlert] = useState(false);
    const [valueStatus, setValueStatus] = useState(0);
    function defaultDataInput() : InputBlockUser{
        const data = {
            ids: [props.id],
            status: valueStatus
        }
        return data;

    }

    async function BlockUser() {
        try{
            const res = await blockUser(defaultDataInput());
            if(res.code === 200){
                console.log('deleted success!');
                props.setStatusUser(randomNumberInRange(1, 1000));
            }
        }catch (e){
            console.log('error');
        }

    }
    return<>
        <tr onClick={props.onClick}
            className={(props.userSelected === props.user.id) ? "selected-product" : ""}>
            <td>{props.index + 1}</td>
            <td>{props.user.name}</td>
            <td>{props.user.username}</td>
            <td>{props.user.email}</td>
            <td>{props.user.phone}</td>
            <td style={{width:"150px"}}>{props.user.address}</td>
            <td className="text-center">{props.user.role}</td>
            <td className="text-center">{formatDates(props.user.created_date)}</td>
            {props.user.status === 1 ?
            <td className="flex w-56  items-center border-none justify-evenly">
                <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {setIsOpenBlockUserAlert(true); setValueStatus(0); console.log(valueStatus)}}>Khóa</button>
            </td>
                :
                <td className="flex w-56  items-center border-none justify-evenly">
                    <button className="rounded-full text-white bg-red-800 w-30 px-2" onClick={() => {setIsOpenUnBlockUserAlert(true); setValueStatus(1)}}>Hủy khóa</button>
                </td>
            }
        </tr>
        {isOpenBlockUserAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn khóa người dùng này không?"} setIsOpenQuestionAlert={setIsOpenBlockUserAlert}
                               setOkListener={BlockUser}/>
            </Modal>
        )}
        {isOpenUnBlockUserAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn mở khóa người dùng này không?"} setIsOpenQuestionAlert={setIsOpenUnBlockUserAlert}
                               setOkListener={BlockUser}/>
            </Modal>
        )}
    </>
}