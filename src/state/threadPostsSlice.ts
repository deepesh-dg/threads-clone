import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ThreadPost.ThreadDocuments = {
    total: 0,
    documents: [],
};

const threadPostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        add(state, action: PayloadAction<{ post: ThreadPost.ThreadDocument[]; total?: number }>) {
            state.documents.splice(0, 0, ...action.payload.post);
            state.total = action.payload.total ?? state.total + action.payload.post.length;
        },
        delete(state, action: PayloadAction<string>) {
            state.documents = state.documents.filter((project) => project.$id !== action.payload);
            state.total -= 1;
        },
        empty(state) {
            state = initialState;
        },
        update(state, action: PayloadAction<ThreadPost.ThreadDocument>) {
            state.documents = state.documents.map((project) =>
                project.$id === action.payload.$id ? action.payload : project
            );
        },
        set(state, action: PayloadAction<{ total: number; documents: ThreadPost.ThreadDocument[] }>) {
            state.documents = action.payload.documents;
            state.total = action.payload.total;
        },
    },
});

export const {
    add: addPosts,
    delete: deletePost,
    update: updatePost,
    empty: emptyPosts,
    set: setPosts,
} = threadPostSlice.actions;

export default threadPostSlice.reducer;
