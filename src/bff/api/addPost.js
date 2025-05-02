import { generateDate } from "../utils";

export const addPost = ({ imageUrl, title, content }) =>
    fetch("http://localhost:3005/posts", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json;charset=utf-8",
        },
        body: JSON.stringify({
            title,
            published_at: generateDate(),
            content,
            image_url: imageUrl,
        }),
    }).then((createPost) => createPost.json());
