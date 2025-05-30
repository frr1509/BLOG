import { tranformComment } from "../transforms";

const ALL_COMMENTS_URL = "http://localhost:3005/comments";
const POST_COMMETS_URL = "http://localhost:3005/comments?post_id=";

export const getComments = (postId) => {
    const url =
        postId === undefined ? ALL_COMMENTS_URL : POST_COMMETS_URL + postId;

    return fetch(url).then((loadedComments) =>
        loadedComments
            .json()
            .then(
                (loadedComments) =>
                    loadedComments && loadedComments.map(tranformComment),
            ),
    );
};
