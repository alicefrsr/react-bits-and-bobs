import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 5,
      thumbsDown: 0,
      wow: 0,
      funny: 0,
      heart: 3,
    },
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I hear slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 3,
      thumbsDown: 0,
      wow: 0,
      funny: 5,
      heart: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload); // it's okay to mutate ! thanks to Immmer js under the hood
      },
      prepare(title, content, userId) {
        return {
          // returning the object aformatted as we want it
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              // need a new reducer to update this: reactionAdded
              thumbsUp: 0,
              thumbsDown: 0,
              wow: 0,
              funny: 0,
              heart: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
        // again, this mutates the state, handled by Immerjs
      }
    },
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
