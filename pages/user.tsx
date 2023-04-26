import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import ContentUser from "@/components/User/ContentUser";
import React, {useEffect, useState} from "react";
import {getListProduct} from "@/lib/API";
import {dataInputProduct, dataOutputProduct} from "@/pages/product";
import {getUser} from "@/lib/API/User";
import {User} from "@/components/HomeType";
import {HeaderTable} from "@/components/Product/HeaderTable";
import Pagination from "@/components/Pagination";
import {UpdateUser} from "@/components/User/UpdateUser";
import Modal from "@/components/Alert/Modal";
import AddDiscount from "@/components/Discount/AddDiscount";

export function dataOutputUser(): User{
    const data = {
        id: 0,
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        address: '',
        created_date: '',
        role: '',
        status: 0,
        birth_date: ''
    }
    return data;
}
export function formatDate(date: string){
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
export function formatDates(date: string){
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}
export default function User(){
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([])
    const [statusUser, setStatusUser] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [userSelected, setUserSelected] = useState<number>(-1);
    const [userActive, setUserActive] = useState<User>(dataOutputUser());
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    function nextAddUser(){
        router.push('/add-user').then();
    }
    useEffect(() =>{
        const token = localStorage.getItem('accessToken');
        if(!token){
            router.push('/login').then();
        }
    }, [])
    useEffect(() => {

        async function fetchUserData() {
            try {
                const res = await getUser()
                const status = res.code;
                if (status === 200) {
                    setUsers(res.data);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }
        fetchUserData().then();
    }, [statusUser,statusUpdate])
    useEffect(() =>{
        async function getUserSelected(){
            for(let i = 0; i < users.length; i++){
                if(users[i].id === userSelected){
                    setUserActive(users[i]);
                }
            }
        }
        getUserSelected().then();
    }, [userSelected])
    return<>
        <Layout>
            <div>
                <div className="rounded-md bg-violet-700 text-white p-2 m-2 ml-14" style={{width: "200px"}} onClick={nextAddUser}>Add New User</div>
            </div>
            <div>
                <table border={1} className="ml-5">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Ngày tạo</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                {currentPosts.map((user, index) => (
                        <ContentUser key={user.id} onClick={() => setUserSelected(user.id)}
                                     index={index}
                                     userSelected={userSelected} user={user} id={user.id} setStatusUser={setStatusUser}/>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-page" >
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={users.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div style={{marginTop: "50px"}}>
                <UpdateUser  userActive={userActive} setStatusUpdate={setStatusUpdate}/>
            </div>
        </Layout>
    </>
}