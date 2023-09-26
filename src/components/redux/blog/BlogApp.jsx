import { parseISO, formatDistanceToNow } from 'date-fns';

import { useEffect, useState } from 'react';
// import { nanoid } from '@reduxjs/toolkit'; // moved to slice in prepare
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts } from './features/posts/postsSlice';
import { selectAllUsers } from './features/users/usersSlice';
import { postAdded, reactionAdded } from './features/posts/postsSlice';
import BackLink from '../../BackLink.jsx';
import styles from './BlogApp.module.css';

function BlogApp() {
  useEffect(() => {
    document.title = 'Redux Blog';
    // clean up
    return () => (document.title = 'bits&bobs | Home');
  }, []);
  return (
    <main className={styles.app}>
      <BackLink />
      <h1>⚛️ The React-Redux Blog 📝</h1>
      <AddPostForm />
      <PostsList />
    </main>
  );
}

//////////////////////////////
const PostsList = () => {
  const posts = useSelector(selectAllPosts); // so if the state shape change, we can just change it in the slice and not everywhere we select it

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p className={styles.postCredit}>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p className={styles.content}>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

//////////////////////////////
const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

//////////////////////////////
const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>({timeAgo})</i>
    </span>
  );
};

//////////////////////////////
// object lookup
const reactionEmoji = {
  thumbsUp: '👍',
  thumbsDown: '👎',
  wow: '😮',
  funny: '😂',
  heart: '❤️',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className={styles.reactionButton}
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

//////////////////////////////
const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      // dispatch(postAdded({ id: nanoid(), title, content })); // prepare in slice
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {usersOptions}
        </select>

        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button
          className={styles.btn}
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
export default BlogApp;
