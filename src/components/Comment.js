import { useState } from 'react';

const Comment = ({ comment }) => {
  const [reply, setReply] = useState('');
  const [showReply, setShowReply] = useState(false);

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
    // console.log("testing ------",replyData);
    setReply('');
    if (!comment.replies) {
          // If replies is not already defined, initialize it as an empty array
          comment.replies = [];
        }
    comment.replies.push(data); // Update local replies
   
    
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
        {comment.replies?.length>0 && comment.replies.map((reply) => (
          <Comment key={reply._id} comment={reply} />
        ))}
      </div>
    )}
      </div>
     
     
    </div>
  );

  
};

export default Comment;