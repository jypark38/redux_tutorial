import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

const PostsList = () => {
  const dispatch = useDispatch()

  // 리렌더링 최적화하려면 메모이징 셀렉터를 따로 만들어야 할듯?
  const orderdPostIds = useSelector(selectPostIds)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderdPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
