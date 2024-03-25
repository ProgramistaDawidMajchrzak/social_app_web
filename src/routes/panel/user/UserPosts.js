import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { allPostsByUser } from '../../../services/posts.service';
import { BoardElement, BoardSkeleton } from '../board/Board';
import { BoardStyle } from '../board/style';

function UserPosts() {
    const { userId } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingMorePosts, setLoadingMorePosts] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const boardContainerRef = useRef(null);

    const fetchUserPosts = async (user_id, page) => {
        try {
            const data = await allPostsByUser(user_id, page);
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
            fetchUserPosts(userId, currentPage);
        }

    }, [currentPage, noMorePosts]);

    return (
        <BoardStyle>
            <div className="user-view-overflow" ref={boardContainerRef}>
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
        </BoardStyle>
    )
}

export default UserPosts;