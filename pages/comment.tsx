import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {Comments, InputProduct} from "@/components/HomeType";
import {useRouter} from "next/router";
import {deleteComment, getComment} from "@/lib/API/Comment";
import {formatDates} from "@/pages/user";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/User/UpdateUser";
import AddComment from "@/components/Comment/AddComment";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import ChildComment from "@/components/Comment/ChildComment";
import Pagination from "@/components/Pagination";
import {getListProduct} from "@/lib/API";


export function dataOutputComment(): Comments {
    const data = {
        id: 0,
        content: '',
        rating: 0,
        comment_date: '',
        username: '',
        user_id: 0,
        product_id: 0,
        status: 0
    }
    return data;
}
function dataInputProduct() {
    const data: InputProduct = {
        filter: {
            search: '',
            product_id: [],
            category_id: [],
            campaign_id: [],
            price: {
                min: 0,
                max: 10000000
            },
            import_date: {
                min: '2000-01-01',
                max: '3000-01-01'
            }
        },
        sort: {
            field: "import_date",
            order: "DESC"
        },
        pagination: {
            page: 0,
            perPage: 1000
        }
    }
    return data;
}
export default function Comment() {
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
    const [isShowChildComments, setIsShowChildComments] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = Comments.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (page0: number) => setCurrentPage(page0)
    async function fetchProduct(id: number) {
        try {
            const res = await getListProduct(dataInputProduct())
            const status = res.code;
            if (status === 200) {
              for(let i = 0; i < res.data.length; i++){
                  if(res.data[i].id === id){

                  }
              }
            } else {
                console.log('error');
            }
        } catch (e) {
            console.log('error');
        }
    }
    useEffect(() => {
        async function fetchCommentData() {
            try {
                const res = await getComment()
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
            const res = await deleteComment(CommentSelected);
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
        <Layout>
            {isShowChildComments ? (
                <Modal>
                    <ChildComment commentId={CommentSelected} setIsShowChildComments={setIsShowChildComments}/>
                </Modal>
            ) : <>
                <div>
                    <table border={1} className="ml-5">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Content</th>
                            <th>Rating</th>
                            <th>Comment Date</th>
                            <th>Product</th>
                            <th>Username</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {currentPosts.map((comment, index) => (
                            <tr key={index} onClick={() => setCommentSelected(comment.id)}
                                className={(CommentSelected === comment.id) ? "selected-product" : ""}
                            >
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{comment.content}</td>
                                <td className="text-center">{comment.rating}</td>
                                <td className="text-center">{formatDates(comment.comment_date)}</td>
                                <td className="text-center">{comment.product_id}</td>
                                <td className="text-center">{comment.username}</td>
                                <td className="p-0">
                                    <button className="rounded-full text-white bg-red-800 w-20 px-2" onClick={() => {
                                        setIsOpenDeleteCategoryAlert(true)
                                    }}>Xóa
                                    </button>
                                </td>
                                <td className="p-0">
                                    <button className="rounded-full text-white bg-green-800 w-20 px-2" onClick={() => {
                                        setIsOpenAddComment(true)
                                    }}>Phản hồi
                                    </button>
                                </td>
                                <td className="p-0">
                                    <button className="rounded-full text-white bg-green-800 w-250 px-2" onClick={() => {
                                        setIsShowChildComments(true)
                                    }}>Xem phản hồi
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
            </>
            }

        </Layout>
        {isOpenDeleteCategoryAlert && (
            <Modal>
                <QuestionAlert textError={"Bạn có chắc chắn muốn mở khóa bình luận này không?"}
                               setIsOpenQuestionAlert={setIsOpenDeleteCategoryAlert}
                               setOkListener={DeleteComment}/>
            </Modal>
        )}
        {isOpenAddComment && (
            <Modal>
                <AddComment setStatusComment={setStatusComment} setIsOpenAddProduct={setIsOpenAddComment}
                            setIsOpenSuccess={setIsOpenSuccess}
                            setTextSuccess={setTextSuccess}
                            setIsOpenError={setIsOpenError}
                            setTextError={setTextErrors}
                            commentId={CommentSelected}
                />
            </Modal>
        )}
        {isOpenSuccess && (
            <Modal>
                <Success textSuccess={textSuccess}/>
            </Modal>
        )}
        {isOpenError && (
            <Modal>
                <Errors textError={textErrors}/>
            </Modal>
        )}
    </>
}