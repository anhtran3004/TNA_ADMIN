import Layout from "@/components/Layout";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Comments} from "@/components/HomeType";

import Pagination from "@/components/Pagination";
import {useRouter} from "next/router";
import {deleteChildComment, deleteComment, getChildComment, getComment} from "@/lib/API/Comment";
import {formatDates} from "@/pages/user";

import {randomNumberInRange} from "@/components/User/UpdateUser";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";



export function dataOutputComment(): Comments {
    const data = {
        id: 0,
        content: '',
        rating: 0,
        comment_date: '',
        username: '',
        user_id: 0,
        product_id: 0,
        name: '',
        status: 0
    }
    return data;
}
interface Props {
    commentId: number,
    setIsShowChildComments: Dispatch<SetStateAction<boolean>>
}

export default function ChildComment(props:Props) {
    const router = useRouter();
    const [Comments, setComments] = useState<Comments[]>([])
    const [statusComment, setStatusComment] = useState(-1);
    const [statusUpdate, setStatusUpdate] = useState(-1);
    const [CommentSelected, setCommentSelected] = useState<number>(-1);
    const [commentActive, setCommentActive] = useState<Comments>(dataOutputComment());
    const [isOpenDeleteCategoryAlert, setIsOpenDeleteCategoryAlert] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [isOpenAddComment, setIsOpenAddComment] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = Comments.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (page0: number) => setCurrentPage(page0)
    useEffect(() => {
        const token = localStorage.getItem('accessTokenAdmin');
        if (!token) {
            router.push('/login').then();
        }
    }, [])
    useEffect(() => {

        async function fetchCommentData() {
            try {
                const res = await getChildComment(props.commentId)
                const status = res.code;
                if (status === 200) {
                    setComments(res.data);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchCommentData().then();
    }, [statusComment, statusUpdate])

    async function DeleteComment() {
        try {
            const res = await deleteChildComment(CommentSelected);
            if (res.code === 200) {
                console.log('Delete comment success');
                setStatusComment(randomNumberInRange(1, 1000))
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    useEffect(() => {
        async function getCommentSelected() {
            for (let i = 0; i < Comments.length; i++) {
                if (Comments[i].id === CommentSelected) {
                    setCommentActive(Comments[i]);
                }
            }
        }

        getCommentSelected().then();
    }, [CommentSelected])
    return <>
            <div>
                <div className="m-4 font-bold text-2xl cursor-pointer" onClick={() => props.setIsShowChildComments(false)}>Trở lại</div>
                <table border={1} className="ml-5">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Comment</th>
                        <th>Comment Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((comment, index) => (
                        <tr key={index} onClick={() => setCommentSelected(comment.id)}
                            className={(CommentSelected === comment.id) ? "selected-product" : ""}
                        >
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{comment.content}</td>
                            <td className="text-center">{formatDates(comment.comment_date)}</td>
                            <td className="text-center">
                                <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {
                                    setIsOpenDeleteCategoryAlert(true)
                                }}>Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-page">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={Comments.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        {isOpenDeleteCategoryAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn mở khóa bình luận này không?"}
                               setIsOpenQuestionAlert={setIsOpenDeleteCategoryAlert}
                               setOkListener={DeleteComment}/>
            </Modal>
        )}
    </>
}