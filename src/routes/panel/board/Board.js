import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as S from './style';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { allPosts } from '../../../services/posts.service';

function Board() {
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const boardContainerRef = useRef(null);

    const fetchAllPosts = async (page) => {
        console.log(page)
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

            if (scrollTop + clientHeight >= scrollHeight - 1) {
                console.log(loadingMorePosts);
                if (!loadingMorePosts && !noMorePosts) {
                    console.log(loadingMorePosts);
                    setCurrentPage(prevPage => prevPage + 1);
                }
            }
        };

        boardContainerRef.current.addEventListener('scroll', handleScroll);

        // return () => {
        //     boardContainerRef.current.removeEventListener('scroll', handleScroll);
        // };
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
                    </>
                }
            </div>
        </S.BoardStyle>
    )
}

export default Board;

function BoardElement({ post }) {

    return (
        <S.BoardEl>
            <h6>{post.author.name}</h6>
            <h2>{post.title}</h2>
        </S.BoardEl>
    )
}

function BoardSkeleton() {
    return (
        <S.BoardEl>
            <div className="flex">
                <Skeleton className='skeleton-img' />
                <Skeleton className='skeleton-author' count={2} />
            </div>
            <Skeleton className='skeleton-content' count={5} />
        </S.BoardEl>
    )
}