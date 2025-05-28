import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { Pagination, PostCard, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constans";
import { debounce, getLastPageFromLinks } from "./utils";

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setlastPage] = useState(1);
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");
    const serverRequest = useServerRequest();

    useEffect(() => {
        serverRequest("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
            ({ res: { posts, links } }) => {
                setPosts(posts);
                setlastPage(getLastPageFromLinks(links));
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverRequest, page, shouldSearch]);

    const startDelayedSearch = useMemo(
        () => debounce(setShouldSearch, 2000),
        [],
    );

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        startDelayedSearch(!shouldSearch);
    };

    return (
        <div className={className}>
            <div className="post-and-search">
                <Search searchPhrase={searchPhrase} onChange={onSearch} />
                {posts.length > 0 ? (
                    <div className="post-list">
                        {posts.map(
                            ({
                                id,
                                title,
                                imageUrl,
                                publishedAt,
                                commentsCount,
                            }) => (
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
                ) : (
                    <div className="no-found-posts">Статьи не найдены</div>
                )}
            </div>

            {lastPage > 1 && posts.length > 0 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage} />
            )}
        </div>
    );
};

export const Main = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .post-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;
    }

    & .no-found-posts {
        text-align: center;
    }
`;
