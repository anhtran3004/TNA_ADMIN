import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {Contact} from "@/components/HomeType";

import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import {getContact} from "@/lib/API/Contact";
import ContentContact from "@/components/Contact/ContentContact";


export function dataOutputContact(): Contact{
    const data = {
        id: 0,
        email: '',
        name: '',
        message: '',
        subject: '',
        status: 0,
        phone: '',
        created_date: ''
    }
    return data;
}

export default function Contact(){
    const router = useRouter();
    const [Contacts, setContacts] = useState<Contact[]>([])
    const [statusContact, setStatusContact] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [ContactSelected, setContactSelected] = useState<number>(-1);
    const [ContactActive, setContactActive] = useState<Contact>(dataOutputContact());
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = Contacts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    function nextAddContact(){
        router.push('/add-Contact').then();
    }
    useEffect(() =>{
        const token = localStorage.getItem('accessToken');
        if(!token){
            router.push('/login').then();
        }
    }, [])
    useEffect(() => {

        async function fetchContactData() {
            try {
                const res = await getContact()
                const status = res.code;
                if (status === 200) {
                    setContacts(res.data);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }
        fetchContactData().then();
    }, [statusContact,statusUpdate])
    useEffect(() =>{
        async function getContactSelected(){
            for(let i = 0; i < Contacts.length; i++){
                if(Contacts[i].id === ContactSelected){
                    setContactActive(Contacts[i]);
                }
            }
        }
        getContactSelected().then();
    }, [ContactSelected])
    return<>
        <Layout>
            <div>
                <table border={1} className="ml-5">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Subject</th>
                        <th>Phone</th>
                        <th>Created date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((Contact, index) => (
                        <ContentContact key={Contact.id} onClick={() => setContactSelected(Contact.id)}
                                     index={index}
                                     contactSelected={ContactSelected} contact={Contact} id={Contact.id} setStatusContact={setStatusContact}/>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-page" >
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={Contacts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </Layout>
    </>
}