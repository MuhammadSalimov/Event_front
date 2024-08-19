import { IPost } from "@/interfaces";
import { create } from "zustand";

type PostStoreType = {
  posts: IPost[];
  myPosts: IPost[];
  setMyPosts: (post: IPost[]) => void;
  setPosts: (posts: IPost[]) => void;
};

export const postStore = create<PostStoreType>((set) => ({
  posts: [],
  myPosts: [],
  setMyPosts: (myPosts) => set({ myPosts }),
  setPosts: (posts) => set({ posts }),
}));
