import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetPostQuery } from '../api/apiSlice'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { Spinner } from '../../components/Spinner'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  // const post = useSelector((state) => selectPostById(state, postId))

  const { data: post, isFetching, isSuccess, isError } = useGetPostQuery(postId)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <ReactionButtons post={post} />
      </article>
    )
  } else if (isError) {
    content = <h2>Post not found!</h2>
  }

  return <section>{content}</section>
}

export default SinglePostPage
