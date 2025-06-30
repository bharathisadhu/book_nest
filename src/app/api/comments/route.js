
import connectToDatabase from '@/lib/mongodb';
import Comment from '../../../../models/Comment';
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, username, blogId, text, parentId } = await request.json();
  await connectToDatabase();
  const newItem =await Comment.create({ email, username, blogId, text, parentId });
  return NextResponse.json({ message: "Comment Created",Comment:newItem }, { status: 201 });
} 



export async function GET(request) {
  try {
    await connectToDatabase();
    await connectToDatabase();

    // Get the query parameters
    const url = new URL(request.url);
    const blogId = url.searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ message: 'Missing blogId' }, { status: 400 });
    }
   

    const comments = await Comment.find({ blogId, parentId: null }).sort({ createdAt: -1 });
      const populatedComments = await Promise.all(
        comments.map(async (comment) => {
          const replies = await Comment.find({ parentId: comment._id }).sort({ createdAt: -1 });
          return { ...comment.toObject(), replies };
        })
      );
     

      return NextResponse.json(populatedComments);


  } catch (error) {
      return NextResponse.json({ message: 'Error fetching blogs', error }, { status: 500 });
  }
}


