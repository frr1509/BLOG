import styled from "styled-components";
import { Comments, PostContent, PostForm } from "./components";
import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { LoadPostAsync, resetPostData } from "../../actions";
import { selectPost } from "../../selecrtors";

const PostContainer = ({ className }) => {
    const post = useSelector(selectPost);
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();
    const isEditing = useMatch("/post/:id/edit");
    const isCreating = useMatch("/post");
    useLayoutEffect(() => {
        dispatch(resetPostData);
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            return;
        }
        dispatch(LoadPostAsync(requestServer, params.id));
    }, [requestServer, params.id, dispatch, isCreating]);

    return (
        <div className={className}>
            {isCreating || isEditing ? (
                <PostForm post={post} isCreating={isCreating} />
            ) : (
                <>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </>
            )}
        </div>
    );
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
`;
