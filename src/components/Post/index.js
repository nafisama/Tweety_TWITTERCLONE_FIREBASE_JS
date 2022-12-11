import React from 'react';
import {BsThreeDots} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {GoComment} from "react-icons/go";
import {BsSave} from "react-icons/bs";
const Post = ({postIndex}) => {
  return (
    <div className="flex flex-col w-full border border-gray-200 ">
      <div className="flex items-center justify-between p-2 space-x-2 bg-white ">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 bg-black border-pink-400 border-2 rounded-full" />
          <div>username</div>
        </div>
        <div className="w-4 ml select-none">
          <BsThreeDots className="text-lg" />
        </div>
      </div>
      <div className="bg-black  aspect-video bg-black"> Image</div>
      <div className="flex justify-between p-2 text-lg ">
        <div className="flex space-x-4">
          <div>
            <AiOutlineHeart
              size={25}
              className="cursor-pointer hover:text-opacity-50 text-black"
            />
          </div>
          <div>
            <GoComment
              size={25}
              className=" cursor-pointer hover:text-opacity-50 text-black"
            />
          </div>
        </div>
        <div>
          <BsSave
            size={20}
            className=" cursor-pointer hover:text-opacity-50 text-black"
          />
        </div>
      </div>
      <div className="px-2">1000 Likes</div>
      <div className="p-2">
        <div className="flex flex-col space-y-1">
          {new Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex space-x-2">
              <div className="font-medium"> username </div>
              <div>comment {i}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2">3 hours ago</div>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full ">
          <div className="flex bg-gray-200 items-center  border-t border-gray-400 w-full items-center  space-y-2">
            <input
              type="text"
              name={`comment${postIndex}`}
              id={`comment ${postIndex}`}
              className="px-2 py-1 w-full bg-gray-200 outline-none "
              placeholder="Add a Comment ... "
            />
            <div>
              <button className="px-2 py-1 text-center text-yellow-400 font-semibold">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;