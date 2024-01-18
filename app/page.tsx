"use server"
import dataJson from "@/app/lib/data.json"
import '@/app/globals.css'
import Image from "next/image"
import { uploadComment } from "./actions/comment"

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3  p-10 bg-very-light-gray">
      {dataJson.comments.map((data) => (
        <article key={data.id} className="max-w-[600px] article-layout bg-white p-5 rounded-md  w-full">
          <div className="flex flex-col items-center justify-center ">
            <div className=" text-white rounded-md bg-light-gray flex flex-col w-[30px] items-center justify-between">
              <button className="text-grayish-blue font-bold">+</button>
              <p className="text-moderate-blue font-bold">{data.score}</p>
              <button className="text-grayish-blue font-bold">-</button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-left w-full">
            <div className="text-dark-blue flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <Image src={`${data.user.image.png}`} alt="user image" width={30} height={30} />
                <p className="text-dark-blue">{data.user.username}</p>
                <p className="text-grayish-blue">{data.createdAt}</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Image src={'/images/icon-reply.svg'} width={15} height={15} alt="reply icon" />
                <button className="text-moderate-blue font-bold">Reply</button>
              </div>
            </div>
            <div className="text-grayish-blue text-left w-full mt-2">
              {data.content}
            </div>
          </div>
        </article>
      ))}
      <form action={uploadComment}>
        <input name="comment" placeholder="Enter a comment..." className="p-2 text-black bg-transparent rounded-md border border-moderate-blue" />
        <button type="submit" className="text-moderate-blue p-2 font-bold">Enviar</button>
      </form>
    </main>
  )
}
