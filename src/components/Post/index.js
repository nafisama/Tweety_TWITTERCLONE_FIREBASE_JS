import { uuidv4 } from '@firebase/util';
import { uuid } from 'uuidv4';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import {GoComment} from "react-icons/go";git 
//import {BsSave} from "react-icons/bs";
import { BsBookmark, BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import { IoShareOutline } from 'react-icons/io5';
import { auth, db } from '../../lib/firebase';
import { GlobalContext } from '../../state/context/GlobalContext';

const Post = ({ id, username, image, caption, likesCount }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const handleLikePost = async () => {
    const postLike = {
      postId: id,
      userId: auth.currentUser.uid,
      username,
    };

    const likeRef = doc(db, `likes/${id}_${auth.currentUser.uid}`);
    const postRef = doc(db, `posts/${id}`);

    let updatedLikesCount;

    if (isLiked) {
      await deleteDoc(likeRef);
      if (likesCount) {
        updatedLikesCount = likesCount - 1;
      } else {
        updatedLikesCount = 0;
      }
      await updateDoc(postRef, {
        likesCount: updatedLikesCount,
      });
    } else {
      await setDoc(likeRef, postLike);
      if (likesCount) {
        updatedLikesCount = likesCount + 1;
      } else {
        updatedLikesCount = 1;
      }
      await updateDoc(postRef, {
        likesCount: updatedLikesCount,
      });
    }
  };

  useEffect(() => {
    const likesRef = collection(db, 'likes');
    const likesQuery = query(
      likesRef,
      where('postId', '==', id),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribeLike = onSnapshot(likesQuery, (snapshot) => {
      const like = snapshot.docs.map((doc) => doc.data());
      if (like.length !== 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });

    const commentsRef = collection(db, `posts/${id}/comments`);
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'desc'));

    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const comments = snapshot.docs.map((doc) => doc.data());
      setComments(comments);
    });
    return () => {
      unsubscribeLike();
      unsubscribeComments();
    };
  }, [id]);

  const comment = useRef(null);

  const { user } = useContext(GlobalContext);

  const handlePostComment = async (e) => {
    e.preventDefault();
    // comment functionality
    const commentData = {
      id: uuidv4(),
      username: user.username,
      comment: comment.current.value,
      createdAt: serverTimestamp(),
    };
    comment.current.value = '';
    const commentRef = doc(db, `posts/${id}/comments/${commentData.id}`);
    await setDoc(commentRef, commentData);
  };

  
  return (
    <div className="flex flex-col w-full border border-gray-200 ">
      <div className="flex items-center justify-between p-2 space-x-2 bg-white ">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10 bg-black border-pink-400 border-2 rounded-full" />
          <div>{username}</div>
        </div>
        <div className="w-4 ml select-none">
          <BsThreeDots className="text-lg" />
        </div>
      </div>
      <div className="relative flex items-center justify-center bg-black aspect-square">
        <Image
          src={image}
          alt={caption}
          className="object-contain w-fill"
        />
      </div>
      <div className="flex justify-between p-2 text-lg">
        <div className="flex space-x-2">
          <div onClick={handleLikePost}>
            {isLiked ? (
              <AiFillHeart
                size={25}
                className="text-red-500 cursor-pointer hover:text-red-500/50"
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="text-black cursor-pointer hover:text-black/50"
              />
            )}
          </div>
          <div>
            <GoComment
              size={22}
              className="text-black cursor-pointer hover:text-black/50"
            />
          </div>
          <div>
            <IoShareOutline
              size={22}
              className="text-black cursor-pointer hover:text-black/50"
            />
          </div>
        </div>
        <div>
          <BsBookmark
            size={20}
            className="text-black cursor-pointer hover:text-black/50"
          />
        </div>
      </div>
      <div className="px-2">
        {likesCount ? `${likesCount} likes` : 'Be the first to like'}
      </div>
      <div className="px-2">{caption}</div>
      <div className="p-2">
        <div className="flex flex-col space-y-1">
          {comments.map((commentData) => (
            <div key={commentData.id} className="flex space-x-2">
              <div className="font-medium">{commentData.username}</div>
              <div>{commentData.comment}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2">3 hours ago</div>
      <div className="flex items-center px-2 py-4 mt-1 space-x-3 border-t border-gray-200">
        <div>
          <BsEmojiSmile className="text-xl" />
        </div>



        <form onSubmit={(e) => e.preventDefault()} className="flex w-full ">
          <div className="flex bg-gray-200 items-center  border-t border-gray-400 w-full items-center  space-y-2">
            <input
              type="text"
              name={`comment ${id}`}
              id={`comment ${id}`}
              className="px-2 py-1 w-full bg-gray-200 outline-none "
              placeholder="Add a Comment ... "
              ref={comment}
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