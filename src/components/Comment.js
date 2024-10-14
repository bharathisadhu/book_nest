import { useState } from 'react';
import { useRouter } from "next/navigation";

const Comment = ({ comment }) => {

  const [reply, setReply] = useState('');
  const [showReply, setShowReply] = useState(false);

  const [replyVisibleCount, setReplyVisibleCount] = useState(0);

  const router = useRouter();
    // Load more replies for a specific comment
  const loadMoreReplies = (commentId) => {
    setReplyVisibleCount({
      ...replyVisibleCount,
      [commentId]: (replyVisibleCount[commentId] || 2) + 2, // Show 2 more replies each time
    });
  };

  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const replyData = { email:comment.email, username:comment.username, blogId:comment.blogId, text: reply, parentId: comment._id };
    
    const response = await fetch(`${baseUrl}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData),
    });
    const data = await response.json();

    if (response.ok) {
        router.refresh();
        
      } else {
        throw new Error("Failed to create a reply");
      }


    setReply('');
    if (!comment.replies) {

          comment.replies = [];
        }
    comment.replies.push(data); 

  };
    
   
  return (
    <div className="comment p-4 border border-gray-300 rounded mb-4">
      <div>
      <p><span className="text-orange-800 uppercase">{comment.username}-</span><span className="text-[red] font-semibold">{comment.text}</span></p>
      </div>
      <div>
      {(!comment?.parentId)&&
          <button 
          className="mt-2 text-blue-500"
        onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Cancel' : 'Reply'}
        </button>
      }
      
    {showReply && (
      <form onSubmit={handleReplySubmit} className="mt-2">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write a reply..."
        />
        
        <button 
         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        type="submit">Post Reply
        </button>
      </form>
    )}
    {comment.replies && (
      <div>

        {comment.replies?.length>0 && comment.replies.slice(0, replyVisibleCount[comment?.parentId] || 2).map((reply) => (
          <Comment key={reply._id} comment={reply} />
        ))}

        {(comment.replies?.length>0)&&
        <button  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 

        onClick={() => loadMoreReplies(comment?.parentId)}>
                          Load More Replies
                        </button>
        }

      </div>
    )}

      </div>
      
    </div>
  );
  
};

export default Comment;