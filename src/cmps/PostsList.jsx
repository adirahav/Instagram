import { PostPreview } from "./PostPreview"

export function PostsList({posts, onLike, onAddComment, onPostDetailsPress}) {
    
    return (
        <section className='posts'>
            {posts.map((post, index) => (
                <PostPreview key={index} post={post} onLike={onLike} onAddComment={onAddComment} onPostDetailsPress={onPostDetailsPress}></PostPreview>
            ))}
        </section>
    )
}
