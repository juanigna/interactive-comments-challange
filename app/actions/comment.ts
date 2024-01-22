"use server"
import json from "@/app/lib/data.json"


export const uploadComment = async (comment: string) => {

    let commentObj = {
        id: json.comments.length + 1,
        content: comment,
        createdAt: "1 day ago",
        score: 0,
        user: {
            image: {
                png: "/images/avatars/image-maxblagun.png",
                webp: "/images/avatars/image-maxblagun.webp"
            },
            username: "maxblagun"
        },
        replies: []
    }

    json.comments.push(commentObj)

}