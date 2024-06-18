import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "src/entities/Editor/model/slice/editorSlice";
import patternSlice from "src/entities/Pattern/model/patternSlice";
import audioContextSlice from "./audioContextSlice";

export const store = configureStore({
	reducer: { editor: editorSlice, patterns: patternSlice, audioContext: audioContextSlice },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				// ignoredActions: ["your/action/type"],
				// Ignore these field paths in all actions
				ignoredActionPaths: ["payload.pattern"],
				// Ignore these paths in the state
				ignoredPaths: ["patterns.list"],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
