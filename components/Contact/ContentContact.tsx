import React, {Dispatch, SetStateAction, useState} from "react";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";

import {randomNumberInRange} from "@/components/Product/UpdateProduct";
import {Contact} from "@/components/HomeType";
import {formatDates} from "@/pages/user";
import {deleteContact} from "@/lib/API/Contact";

interface Props {
    onClick: () => void,
    contactSelected: number,
    contact: Contact,
    index: number,
    id: number,
    setStatusContact: Dispatch<SetStateAction<number>>
}

export default function ContentContact(props: Props) {
    const [isOpenBlockContactAlert, setIsOpenBlockContactAlert] = useState(false);

    async function DeleteContact() {
        try {
            const res = await deleteContact(props.contact.id);
            if (res.code === 200) {
                props.setStatusContact(randomNumberInRange(1, 1000));
            }
        } catch (e) {
            console.log('error');
        }

    }

    return <>
        <tr onClick={props.onClick}
            className={(props.contactSelected === props.contact.id) ? "selected-product" : ""}>
            <td>{props.index + 1}</td>
            <td>{props.contact.email}</td>
            <td>{props.contact.name}</td>
            <td>{props.contact.message}</td>
            <td>{props.contact.subject}</td>
            <td className="text-center">{props.contact.phone}</td>
            <td style={{width: "200px"}}>{formatDates(props.contact.created_date)}</td>
            <td className="flex w-56  items-center border-none justify-evenly">
                <button className="rounded-full text-white bg-red-800 w-20 px-2"
                        onClick={() => {
                            setIsOpenBlockContactAlert(true)
                        }}
                        style={{padding: "10px 0"}}>
                    <i className="fa-solid fa-trash-can" style={{marginRight: "10px"}}></i>
                    Xóa
                </button>
            </td>
        </tr>
        {isOpenBlockContactAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn xóa liên hệ này không?"}
                               setIsOpenQuestionAlert={setIsOpenBlockContactAlert}
                               setOkListener={DeleteContact}/>
            </Modal>
        )}
    </>
}