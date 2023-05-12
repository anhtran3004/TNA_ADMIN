import {Campaign, Category, Color, Discount, InputUpdateUser, Inventory, Size, User} from "@/components/HomeType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {updateUser} from "@/lib/API/User";


const _ = require('lodash');

interface Props {
    userActive: User,
    setStatusUpdate: Dispatch<SetStateAction<number>>
}

export function randomNumberInRange(min: number, max: number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function UpdateUser(props: Props) {
    const [valueName, setValueName] = useState(props.userActive.name);
    const [valueEmail, setValueEmail] = useState(props.userActive.email);
    const [valueUsername, setValueUsername] = useState(props.userActive.username);
    const [valueAddress, setValueAddress] = useState(props.userActive.address);
    const [valuePhone, setValuePhone] = useState(props.userActive.phone);
    const [valueRole, setValueRole] = useState(props.userActive.role);
    useEffect(() => {
        setValueName(props.userActive.name);
        setValueUsername(props.userActive.username);
        setValueEmail(props.userActive.email);
        setValueAddress(props.userActive.address);
        setValuePhone(props.userActive.phone);
        setValueRole(props.userActive.role);
    }, [props.userActive])
    function inputUpdate(): InputUpdateUser {
        const data = {
            user_input: {
                email: valueEmail,
                name: valueName,
                phone: valuePhone,
                address: valueAddress,
                username: valueUsername,
            }
        }
        return data;
    }

    async function UpdateUser() {
        try {
            const res = await updateUser(props.userActive.id, inputUpdate());
            if (res.code === 200) {
                console.log('update success!');
                props.setStatusUpdate(randomNumberInRange(1, 1000));
            }
        } catch (e) {
            console.log('error');
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        UpdateUser().then();
        console.log("user data: ", props.userActive);
        // TODO: submit user data to backend or perform other actions
    };
    return <div className="mb-10">
        <p className="font-bold ml-5">UPDATE USER DETAIL</p>
        <form onSubmit={handleSubmit} className="update-user-detail ml-5">
            <div>
                <div className="input-product">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={valueName}
                        onChange={(e) => setValueName(e.target.value)}

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
                    />
                </div>
                <div className="input-product">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={valueUsername}
                        onChange={(e) => setValueUsername(e.target.value)}
                    />
                </div>
                <div className="input-product">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={valueAddress}
                        onChange={(e) => setValueAddress(e.target.value)}
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
                    />
                </div>
                {/*<div className="input-product">*/}
                {/*    <label htmlFor="role">Role:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        id="role"*/}
                {/*        name="role"*/}
                {/*        value={valueRole}*/}
                {/*        onChange={(e) => setValueRole(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
            <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update user
            </button>
        </form>
    </div>;
}