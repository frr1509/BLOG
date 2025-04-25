import styled from "styled-components";
import { Comments, PostContent } from "./components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { LoadPostAsync } from "../../actions";
import { selectPost } from "../../selecrtors";

const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();

    useEffect(() => {
        dispatch(LoadPostAsync(requestServer, params.id));
    }, [requestServer, params.id, dispatch]);

    return (
        <div className={className}>
            <PostContent post={post} />
            <Comments comments={post.comments} postId={post.id} />
        </div>
    );
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
`;
