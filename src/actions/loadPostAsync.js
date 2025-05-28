import { setPostData } from "./setPostData";

export const LoadPostAsync = (requestServer, PostId) => (dispatch) =>
    requestServer("fetchPost", PostId).then((postData) => {
        if (postData.res) {
            dispatch(setPostData(postData.res));
        }

        return postData;
    });
