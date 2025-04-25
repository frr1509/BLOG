import { setPostData } from "./setPostData";

export const LoadPostAsync = (requestServer, PostId) => (dispatch) => {
    requestServer("fetchPost", PostId).then((postData) => {
        dispatch(setPostData(postData.res));
    });
};
