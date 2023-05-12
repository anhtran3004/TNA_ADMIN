import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {Comments, InputCommentFilter, InputDiscountFilter, ProductName} from "@/components/HomeType";
import {deleteComment, getComment, getCommentProduct} from "@/lib/API/Comment";
import {formatDate, formatDates} from "@/pages/user";
import Modal from "@/components/Alert/Modal";
import QuestionAlert from "@/components/Alert/QuestionAlert";
import {randomNumberInRange} from "@/components/User/UpdateUser";
import AddComment from "@/components/Comment/AddComment";
import Success from "@/components/Alert/Success";
import Errors from "@/components/Alert/Errors";
import ChildComment from "@/components/Comment/ChildComment";
import Pagination from "@/components/Pagination";
import {dataInputDiscount} from "@/pages/discount";
const _ = require('lodash');

export function dataOutputComment(): Comments {
    const data = {
        id: 0,
        content: '',
        rating: 0,
        comment_date: '',
        username: '',
        name:'',
        user_id: 0,
        product_id: 0,
        status: 0
    }
    return data;
}
export function dataInputComment() {
    const data: InputCommentFilter = {
        filter: {
            search: '',
            comment_date: {
                min: '2023-01-01',
                max: '2050-01-01'
            }
        },
        sort: {
            field: 'comment_date',
            order: 'DESC'
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
    const [listProductName, setListProductName] = useState<ProductName[]>([]);
    const [valueMinImportDate, setValueMinImportDate] = useState('2023-01-01');
    const [valueMaxImportDate, setValueMaxImportDate] = useState('2050-01-01');
    const [valueSearch, setValueSearch] = useState('');
    const [filterComment, setFilterComment] = useState<InputCommentFilter>(dataInputComment());
    const paginate = (page0: number) => setCurrentPage(page0)

    async function fetchCommentProduct() {
        try {
            const res = await getCommentProduct()
            const status = res.code;
            if (status === 200) {
                setListProductName(res.data);
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
                const res = await getComment(filterComment)
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
        fetchCommentProduct().then();
    }, [statusComment, statusUpdate, filterComment])
    useEffect(() => {
    }, [listProductName])
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
    const inputListeners = () => {
        const tempFilter = _.cloneDeep(filterComment);
        tempFilter.filter.search = valueSearch;
        tempFilter.filter.comment_date.min = valueMinImportDate;
        tempFilter.filter.comment_date.max = valueMaxImportDate;
        setFilterComment(tempFilter);
    }
    return <>
        <Layout>
            {isShowChildComments ? (
                <Modal>
                    <ChildComment commentId={CommentSelected} setIsShowChildComments={setIsShowChildComments}/>
                </Modal>
            ) : <>
                <div className="search-order d-flex border-2" style={{marginLeft: "20px", width: "90%", marginTop:"15px"}}>
                    <p>Lọc giảm giá</p>
                    <div className="mr-3 ml-5">
                        <label>Từ:</label>
                        <input style={{width: "150px"}} type="date" value={formatDate(valueMinImportDate)}
                               onChange={(e) => setValueMinImportDate(e.target.value)}/>
                    </div>
                    <div>
                        <label>Đến:</label>
                        <input style={{width: "150px"}} type="date" value={formatDate(valueMaxImportDate)}
                               onChange={(e) => setValueMaxImportDate(e.target.value)}/>
                    </div>
                    <input type="text" placeholder="Search..." value={valueSearch}
                           onChange={(e) => setValueSearch(e.target.value)}/>
                    {/*onClick={inputListeners}*/}
                    <div className="rounded-md bg-blue-400 text-white cursor-pointer p-2"
                         onClick={inputListeners}>Search
                    </div>

                </div>
                <div>
                    <table border={1} className="ml-5" style={{width: "95%"}}>
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
                        {listProductName !== undefined &&
                            currentPosts.map((comment, index) => (
                                <tr key={index} onClick={() => setCommentSelected(comment.id)}
                                    className={(CommentSelected === comment.id) ? "selected-product" : ""}
                                >
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{comment.content}</td>
                                    <td className="text-center">{comment.rating}</td>
                                    <td className="text-center">{formatDates(comment.comment_date)}</td>
                                    <td className="text-center">{comment.name}</td>
                                    <td className="text-center">{comment.username}</td>
                                    <td className="p-0">
                                        <button className="rounded-full text-white bg-red-800 w-20 px-2"
                                                onClick={() => {
                                                    setIsOpenDeleteCategoryAlert(true)
                                                }}>Xóa
                                        </button>
                                    </td>
                                    <td className="p-0">
                                        <button className="rounded-full text-white bg-green-800 w-20 px-2"
                                                onClick={() => {
                                                    setIsOpenAddComment(true)
                                                }}>Phản hồi
                                        </button>
                                    </td>
                                    <td className="p-0">
                                        <button className="rounded-full text-white bg-green-800 w-250 px-2"
                                                onClick={() => {
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