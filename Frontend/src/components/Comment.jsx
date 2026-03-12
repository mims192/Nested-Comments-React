import React, { useState } from 'react'

const Comment = ({ comment, onSubmitComment,onEditComment,onDeleteComment }) => {
    const [expand, setExpand] = useState(false)
    const toggleExpand = () => {
        setExpand(!expand)
    }

    const [replyContent, setReplycontent] = useState("")

    const [editMode,setEditMode]=useState(false);
    const [editedContent,setEditedContent]=useState(comment.content)

    const toggleEditMode=()=>{
        setEditMode(!editMode)
        setEditedContent(comment.content)
    }

    const handleChange = (e) => {
        if(editMode){
            setEditedContent(e.target.value)
        }else{
            setReplycontent(e.target.value);
        }
       
    }

    //here1
    const handlereplysubmit = () => {
        if (replyContent) {
            onSubmitComment(comment.id, replyContent)
            setReplycontent("")
        }
    }
    const handleEditSubmit=()=>{
        onEditComment(comment.id,editedContent)
        setEditMode(false)
    }
   

    return (
        <div className='border rounded-lg p-4 bg-white shadow-sm mt-3'>
            {!editMode?<>
                <p className='text-gray-800 font-medium'>{comment.content}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <span>👍 {comment.votes}</span>
                    <span>{new Date(comment.timestamp).toLocaleString()}</span>
                </div>
            </>: <div className='flex items-center gap-5 '>
                    <textarea className='flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300' rows={3} cols={50} placeholder='Add a new comment' value={editedContent} onChange={handleChange} />
                    <button className='bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600' onClick={handleEditSubmit}>Save Edit</button>
                    <button className='bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600' onClick={toggleEditMode}>Cancel Edit</button>

                </div>
            }

            <div className='flex gap-4 text-sm p-2'>
                <button onClick={toggleExpand} className='text-blue-600 text-sm hover:underline'>
                    {expand ? "Hide Replies" : "Reply"}
                </button>
                <button className='text-blue-600 text-sm hover:underline' onClick={toggleEditMode}>Edit</button>
                <button className='text-blue-600 text-sm hover:underline' onClick={()=>onDeleteComment(comment.id)}>Delete</button>
            </div>
            {expand && <div>
                <div className='flex items-center gap-5 '>
                    <textarea className='flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300' rows={3} cols={50} placeholder='Add a new comment' value={replyContent} onChange={handleChange} />
                    <button className='bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600' onClick={handlereplysubmit}>Add Comment</button>
                </div>

                {comment?.replies.map((reply) => {
                    return <Comment key={reply.id}
                        comment={reply}
                        onSubmitComment={onSubmitComment}
                        onEditComment={onEditComment}
                        onDeleteComment={onDeleteComment}
                    />
                })}
            </div>
            }

        </div>
    )
}
export default Comment
