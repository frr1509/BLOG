export const tranformPost = (dbPost) => ({
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    publishedAt: dbPost.published_at,
    imageUrl: dbPost.image_url,
});
