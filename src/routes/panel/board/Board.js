import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as S from './style';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { allPosts } from '../../../services/posts.service';
import UserImg from '../../../assets/user-sample.png';
import { format } from 'date-fns';

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
                        className="fa-regular fa-lg fa-heart"
                        style={{ color: 'var(--main-color)' }}
                    // onClick={handleLike(post.is_liked_by_me)}
                    ></i>
                    <p>{post.likes_count} {handleActionEnding(post.likes_count, 'like')}</p>
                </div>
                <div className="action-el">
                    <i
                        className="fa-regular fa-lg fa-comment"
                        style={{ color: 'var(--main-color)' }}
                    ></i>
                    <p>{post.comments_count} {handleActionEnding(post.comments_count, 'comment')}</p>
                </div>
            </div>
        </S.BoardEl>
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