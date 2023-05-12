import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import ContentUser from "@/components/User/ContentUser";
import React, {useEffect, useState} from "react";
import {getUser} from "@/lib/API/User";
import {InputUser, User} from "@/components/HomeType";
import Pagination from "@/components/Pagination";
import {UpdateUser} from "@/components/User/UpdateUser";
const _ = require('lodash');
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
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
export function formatDates(date: string){
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}
export function dataInputUser(){
    const data: InputUser = {
        filter: {
            search: '',
            created_date:{
                min: '2023-01-01',
                max: '2050-01-01'
            }
        },
        sort:{
            field: 'created_date',
            order: 'DESC'
        }
    }
    return data;
}
export default function User(){
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([])
    const [statusUser, setStatusUser] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [userSelected, setUserSelected] = useState<number>(-1);
    const [userActive, setUserActive] = useState<User>(dataOutputUser());
    const [currentPage, setCurrentPage] = useState(1);
    const [valueSearch, setValueSearch] = useState('');
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [filterUser, setFilterUser] = useState<InputUser>(dataInputUser())
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    function nextAddUser(){
        router.push('/add-user').then();
    }
    useEffect(() => {
        async function fetchUserData() {
            try {
                const res = await getUser(filterUser)
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
    }, [statusUser,statusUpdate, filterUser])
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
    const inputListeners = () => {
        console.log(valueSearch, valueMinImportDate);
        const tempFilter = _.cloneDeep(filterUser);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.created_date.min =  valueMinImportDate;
        tempFilter.filter.created_date.max = valueMaxImportDate;
        setFilterUser(tempFilter);
    }
    return<>
        <Layout>
            <div className="rounded-md bg-violet-700 text-white p-2"
                 style={{
                     width: "120px",
                     height: "50px",
                     textAlign: "center",
                     margin: "20px",
                     fontSize: "20px"
                 }}
                 onClick={nextAddUser}>Thêm mới
            </div>
            <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "90%"}}>
                <p>Lọc người dùng</p>
                <div className="mr-3 ml-5">
                    <label>Từ ngày:</label>
                    <input style={{width: "150px"}} type="date" value={formatDate(valueMinImportDate)}
                           onChange={(e) => setValueMinImportDate(e.target.value)}/>
                </div>
                <div>
                    <label>Đến ngày:</label>
                    <input style={{width: "150px"}} type="date" value={formatDate(valueMaxImportDate)}
                           onChange={(e) => setValueMaxImportDate(e.target.value)}/>
                </div>
                <input type="text" placeholder="Search..." value={valueSearch}
                       onChange={(e) => setValueSearch(e.target.value)}/>
                <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2" onClick={inputListeners}>Search
                </div>

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