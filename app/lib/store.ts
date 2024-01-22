import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Comment } from "./types";

interface commentStore {
    comments: Comment,
    addComment: (comment: string) => void
    deleteComment: (id: number) => void
    addLike: (id: number) => void
    removeLike: (id: number) => void,
    likedComments: Record<number, boolean>; // <-- Add this line
    isCommentLiked: (id: number) => boolean; // New function to check if a comment is liked


}

export const useCommentStore = create<commentStore>()(
    persist(
        (set, get) => ({
            comments: {
                currentUser: {
                    image: {
                        png: "/images/avatars/image-juliusomo.png",
                        webp: "/images/avatars/image-juliusomo.webp"
                    },
                    username: "juliusomo"
                },
                comments: [
                    {
                        id: 1,
                        content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                        createdAt: "1 month ago",
                        score: 12,
                        user: {
                            image: {
                                png: "/images/avatars/image-amyrobson.png",
                                webp: "/images/avatars/image-amyrobson.webp"
                            },
                            username: "amyrobson"
                        },
                        replies: []
                    },
                    {
                        id: 2,
                        content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                        createdAt: "2 weeks ago",
                        score: 5,
                        user: {
                            image: {
                                png: "/images/avatars/image-maxblagun.png",
                                webp: "/images/avatars/image-maxblagun.webp"
                            },
                            username: "maxblagun"
                        },
                        replies: [
                            {
                                id: 3,
                                content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                                createdAt: "1 week ago",
                                score: 4,
                                replyingTo: "maxblagun",
                                user: {
                                    image: {
                                        png: "/images/avatars/image-ramsesmiron.png",
                                        webp: "/images/avatars/image-ramsesmiron.webp"
                                    },
                                    username: "ramsesmiron"
                                }
                            },
                            {
                                id: 4,
                                content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                                createdAt: "2 days ago",
                                score: 2,
                                replyingTo: "ramsesmiron",
                                user: {
                                    image: {
                                        png: "/images/avatars/image-juliusomo.png",
                                        webp: "/images/avatars/image-juliusomo.webp"
                                    },
                                    username: "juliusomo"
                                }
                            }
                        ]
                    }
                ]
            },
            likedComments: {}, // Track liked comment IDs
            addComment: (comment) => set((state) => {
                const commentObj = {
                    id: state.comments.comments.length + 1,
                    content: comment,
                    createdAt: "1 day ago",
                    score: 0,
                    user: {
                        image: {
                            png: "/images/avatars/image-maxblagun.png",
                            webp: "/images/avatars/image-maxblagun.webp"
                        },
                        username: state.comments.currentUser.username
                    },
                    replies: []
                };

                // Update comments array by creating a new array with the new comment
                const updatedComments = [...state.comments.comments, commentObj];

                // Return the updated state
                return {
                    comments: {
                        ...state.comments,
                        comments: updatedComments,
                    },
                };
            }),
            deleteComment: (id: number) => set((state) => {
                const findCommentIndex = state.comments.comments.findIndex((cmt) => cmt.id === id);

                // Check if the comment with the given id is found
                if (findCommentIndex !== -1) {
                    // Use filter to create a new array excluding the comment to be deleted
                    const updatedComments = state.comments.comments.filter((cmt) => cmt.id !== id);

                    // Return the updated state
                    return {
                        comments: {
                            ...state.comments,
                            comments: updatedComments,
                        },
                    };
                } else {
                    // If the comment is not found, return the current state
                    return state;
                }
            }),
            addLike: (id: number) => set((state) => {
                if (!state.likedComments[id]) {
                    const findCommentIndex = state.comments.comments.findIndex((cmt) => cmt.id === id);
                    if (findCommentIndex !== -1) {
                        // Update the comment score and mark it as liked
                        state.comments.comments[findCommentIndex].score += 1;
                        state.likedComments[id] = true;

                        return {
                            comments: {
                                ...state.comments,
                            },
                            likedComments: state.likedComments,
                        };
                    }
                }

                // If the comment has already been liked, return the current state
                return state;
            }),
            removeLike: (id: number) => set((state) => {
                if (state.likedComments[id]) {
                    const findCommentIndex = state.comments.comments.findIndex((cmt) => cmt.id === id);
                    if (findCommentIndex !== -1) {
                        // Update the comment score and mark it as liked
                        state.comments.comments[findCommentIndex].score -= 1;
                        state.likedComments[id] = false;

                        return {
                            comments: {
                                ...state.comments,
                            },
                            likedComments: state.likedComments,
                        };
                    }
                }
                return state
            }),
            isCommentLiked: (id) => get().likedComments[id],

        }),
        {
            name: 'comment-storage',
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
)