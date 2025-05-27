import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { Pagination, PostCard } from "./components";
import { PAGINATION_LIMIT } from "../../constans";
import { getLastPageFromLinks } from "./utils";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setlastPage] = useState(1);
    const serverRequest = useServerRequest();

    useEffect(() => {
        serverRequest("fetchPosts", page, PAGINATION_LIMIT).then(
            ({ res: { posts, links } }) => {
                setPosts(posts);
                setlastPage(getLastPageFromLinks(links));
            },
        );
    }, [serverRequest, page]);

    return (
        <div className={className}>
            <div className="post-list">
                {posts.map(
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
            {lastPage > 1 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
            )}
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
