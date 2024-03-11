import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as S from './style';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { allPosts } from '../../../services/posts.service';
import UserImg from '../../../assets/user-sample.png';
import { format } from 'date-fns';
import { addLike, deleteLike } from '../../../services/likes.service';
import { addComment, getComments } from '../../../services/comments.service';
import Loading from '../../../assets/loading.svg';
import LoadingDots from '../../../assets/loading-dots.svg';

function Board() {
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const boardContainerRef = useRef(null);

    const fetchAllPosts = async (page) => {
        try {
            const data = await allPosts(page);
            setPosts(prevPosts => [...prevPosts, ...data.data]);
            setLoadingPosts(false);
            setLoadingMorePosts(false);
            if (data.to === data.total) {
                setNoMorePosts(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = boardContainerRef.current;

            // if (scrollTop + clientHeight >= scrollHeight - 1) {
            //     console.log(loadingMorePosts);
            //     if (!loadingMorePosts && !noMorePosts) {
            //         console.log(loadingMorePosts);
            //         setCurrentPage(prevPage => prevPage + 1);
            //     }
            // }
            if (scrollTop === 0 && !loadingMorePosts && !noMorePosts) {
                setCurrentPage(prevPage => prevPage + 1);
            } else if (scrollTop + clientHeight >= scrollHeight - 1) {
                if (!loadingMorePosts && !noMorePosts) {
                    setCurrentPage(prevPage => prevPage + 1);
                }
            }
        };

        boardContainerRef.current.addEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!noMorePosts && !loadingMorePosts) {
            setLoadingMorePosts(true);
            fetchAllPosts(currentPage);
        }
    }, [currentPage, noMorePosts]);

    return (
        <S.BoardStyle>
            <div className="board-overflow" ref={boardContainerRef}>
                {loadingPosts ?
                    <>
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                    </>
                    :
                    <>
                        {posts.map(post =>
                            <BoardElement
                                post={post}
                                key={post.id}
                            />
                        )}
                    </>
                }
                {loadingMorePosts &&
                    <>
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                        <BoardSkeleton />
                    </>
                }
            </div>
        </S.BoardStyle>
    )
}

export default Board;

function BoardElement({ post }) {
    const [likingProcess, setLikingProcess] = useState(false);
    const [isLikedByMe, setIsLikedByMe] = useState(post.is_liked_by_me);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [commentsCount, setCommentsCount] = useState(post.comments_count);

    const [commentProcess, setCommentProcess] = useState(false);
    const [comment, setComment] = useState('');

    const [allComments, setAllComments] = useState([]);

    const [firstCommentMoment, setFirstCommentMoment] = useState(false);

    const formatDate = (date) => {
        return format(new Date(date), 'EEEE, MMM d, h:mm a');
    };

    const handleActionEnding = (count, name) => {
        switch (count) {
            case 1:
                if (name === 'like') {
                    return 'like';
                } else {
                    return 'comment';
                }
            default:
                if (name === 'like') {
                    return 'likes';
                } else {
                    return 'comments';
                }
        }
    };

    const handleLike = async () => {
        if (!likingProcess) {
            setLikingProcess(true);
            if (!isLikedByMe) {
                try {
                    await addLike(post.id);
                    setLikingProcess(false);
                    setIsLikedByMe(true);
                    setLikesCount(prevCount => prevCount + 1);
                } catch (error) {
                    console.error('Error adding like:', error.response.data);
                }
            } else {
                try {
                    await deleteLike(post.id);
                    setLikingProcess(false);
                    setIsLikedByMe(false);
                    setLikesCount(prevCount => prevCount - 1);
                } catch (error) {
                    console.error('Error deleting like:', error.response.data);
                }
            }
        }
    }

    const handleSubmitComment = async (e, post_id) => {
        e.preventDefault();
        if (comment.length && !commentProcess) {
            setCommentProcess(true);
            try {
                await addComment(post_id, { 'comment': comment });
                handleShowAllComments(post.id);
                // if (post.firstcomment == null) {
                //     setFirstCommentMoment(true);
                // }
                setCommentProcess(false);
                setComment('');
            } catch (error) {
                console.error('Error fetching data:', error.response.data);
            }
        }
    }

    const handleShowAllComments = async (post_id) => {
        try {
            const data = await getComments(post_id);
            setAllComments(data);
            setCommentsCount(data.length);
        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
    }

    return (
        <S.BoardEl>
            <div className="flex">
                <div className="img">
                    <img src={UserImg} alt="user-sample" />
                </div>
                <div className='post-info'>
                    <h6>
                        <span>{post.author.name}</span>
                        created post titled:
                        <span>{post.title}</span>
                    </h6>
                    <p>{formatDate(post.created_at)}</p>
                </div>
            </div>
            <div className="content">
                <p>
                    {post.description}
                </p>
            </div>
            <div className="post-action">
                <div className="action-el">
                    <i
                        className={`${isLikedByMe ? 'fa-solid' : 'fa-regular'} fa-lg fa-heart`}
                        style={{ color: 'var(--main-color)' }}
                        onClick={handleLike}
                    ></i>
                    <p>{likesCount} {handleActionEnding(likesCount, 'like')}</p>
                </div>
                <div className="action-el">
                    <i
                        className="fa-regular fa-lg fa-comment"
                        style={{ color: 'var(--main-color)' }}
                    ></i>
                    <p>{commentsCount} {handleActionEnding(commentsCount, 'comment')}</p>
                </div>
            </div>
            {commentsCount !== 0 &&
                <div className="comment-area">
                    {allComments.length === 0 &&
                        <div className="comment">
                            <div className="flex">
                                <div className="img">
                                    <img src={UserImg} alt="user-sample" />
                                </div>
                                <div className='post-info'>
                                    <h6><span>{post.firstcomment.user_name}</span></h6>
                                    <p>{formatDate(post.firstcomment.created_at)}</p>
                                </div>
                            </div>
                            <div className="comment-content">
                                <p>{post.firstcomment.comment}</p>
                            </div>
                        </div>
                    }
                    {(commentsCount > 1 && allComments.length === 0) &&
                        <p
                            className='show-more'
                            onClick={() => handleShowAllComments(post.id)}
                        >
                            Show {commentsCount - 1} more {handleActionEnding(commentsCount - 1, 'comment')}
                        </p>

                    }
                    {allComments.length !== 0 &&
                        allComments.map(comment => <Comment key={comment.id} comment={comment} />)
                    }
                </div>
            }
            <div className="add-comment-area">
                <form onSubmit={e => handleSubmitComment(e, post.id)}>
                    <input
                        type="text"
                        placeholder='Write comment..'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button type="submit">
                        {commentProcess ?
                            <img src={Loading} className='loading-spinner' alt="loading-gif" />
                            :
                            <i
                                className="fa-regular fa-plus"
                                style={{ color: 'var(--white)' }}
                            ></i>
                        }
                    </button>
                </form>
            </div>
        </S.BoardEl>
    )
}

function Comment({ comment }) {

    const formatDate = (date) => {
        return format(new Date(date), 'EEEE, MMM d, h:mm a');
    };

    return (
        <div className="comment">
            <div className="flex">
                <div className="img">
                    <img src={UserImg} alt="user-sample" />
                </div>
                <div className='post-info'>
                    <h6><span>{comment.user_name}</span></h6>
                    <p>{formatDate(comment.created_at)}</p>
                </div>
            </div>
            <div className="comment-content">
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}

function BoardSkeleton() {
    return (
        <S.BoardEl>
            <div className="flex">
                <Skeleton className='img' />
                <Skeleton className='skeleton-author' count={2} />
            </div>
            <Skeleton className='skeleton-content' count={5} />
        </S.BoardEl>
    )
}