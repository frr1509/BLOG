import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { PostCard } from "./components";

const MainContainer = ({ className }) => {
    const [post, setPosts] = useState([]);
    const serverRequest = useServerRequest();

    useEffect(() => {
        serverRequest("fetchPosts").then((posts) => {
            setPosts(posts.res);
        });
    }, [serverRequest]);
    return (
        <div className={className}>
            <div className="post-list">
                {post.map(
                    ({ id, title, imageUrl, publishedAt, commentsCount }) => (
                        <PostCard
                            key={id}
                            id={id}
                            title={title}
                            imageUrl={imageUrl}
                            publishedAt={publishedAt}
                            commentsCount={commentsCount}
                        />
                    ),
                )}
            </div>
        </div>
    );
};

export const Main = styled(MainContainer)`
    & .post-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
    }
`;
