"use server"
import json from "@/app/lib/data.json"
import { revalidatePath } from "next/cache"

export const uploadComment = async (formData: FormData) => {
    const comment = formData.get('comment') as string
    if (!comment) return
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
    revalidatePath('/')
}