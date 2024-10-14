"use client";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommentsList = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${baseUrl}/api/comments?blogId=${id}`);
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, [baseUrl, id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      text: newComment,
      email: session.user.email,
      username: session.user.name,
      blogId: id,
    };

    const response = await fetch(`${baseUrl}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    const data = await response.json();
    setComments([...comments, { ...commentData, _id: data._id }]);
    setNewComment("");
    if (response.ok) {
      router.refresh();
    } else {
      throw new Error("Failed to create a comment");
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyData = {
      text: replyText,
      email: session.user.email,
      username: session.user.name,
      blogId: id,
      parentId: commentId, // Assuming parentId is used to link replies to comments
    };

    const response = await fetch(`${baseUrl}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyData),
    });

    const data = await response.json();
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                { ...replyData, _id: data._id },
              ],
            }
          : comment
      )
    );
    setReplyCommentId(null);
    setReplyText("");
    if (response.ok) {
      router.refresh();
    } else {
      throw new Error("Failed to create a reply");
    }
  };

  return (
    <div className="comments-list p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full">
        <h1 className="text-xl font-bold mb-4">Comments</h1>

        {!session?.user ? (
          <Link href="/login">
            <p>To comment you need to</p>
            <button className="btn btn-outline text-xl">Login</button>
          </Link>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-[200px]"
              placeholder="Write your comment..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit Comment
            </button>
          </form>
        )}
      </div>

      {/* Scrollable comments section */}
      <div className="comment-section w-full max-h-[350px] overflow-y-scroll border border-gray-200 rounded-lg p-4">
        {comments?.length > 0 &&
          comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <Comment comment={comment} />
              {/* Replies section */}
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply._id} className="ml-10 mb-2">
                    <Comment comment={reply} />
                  </div>
                ))}

              {/* Show reply button if logged in */}
              {session?.user && (
                <>
                  <button
                    className="text-blue-500 text-sm mt-2"
                    onClick={() =>
                      setReplyCommentId(
                        replyCommentId === comment._id ? null : comment._id
                      )
                    }
                  >
                    {replyCommentId === comment._id ? "Cancel" : "Reply"}
                  </button>
                  {/* Reply text area for the comment */}
                  {replyCommentId === comment._id && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, comment._id)}
                      className="mt-2 ml-10"
                    >
                      <textarea
                        placeholder="Write your reply..."
                        className="w-full p-2 border border-gray-300 rounded h-[100px]"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Reply
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentsList;
