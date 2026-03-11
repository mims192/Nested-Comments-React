import React, { useState } from 'react'
import usecommenttree from '../hooks/use-comment-tree'
import Comment from './Comment'
function NestedComment({
    comments,
    onSubmit,
    onEdit,
    onDelete
}) {

    const [comment, setComment] = useState("")
    const { comments: commentsData,insertComment } = usecommenttree(comments)
    const handleChange = (e) => {
        setComment(e.target.value);
    }
    const handleSubmit = () => {
        if (comment) {
            handleReply(undefined,comment) //comment id is undefined as new comment has no id
            setComment("")
        }
    }
    const handleReply = (commentId,content) => {
        insertComment(commentId,content)
    }
    return (
        <>
            <div className='flex items-center gap-5 '>
                <textarea className='flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300' rows={3} cols={50} placeholder='Add a new comment' value={comment} onChange={handleChange} />
                <button className='bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600' onClick={handleSubmit}>Add Comment</button>
            </div>
<div className='bg-blue-100'>
            {commentsData?.map((item) => {

                return <Comment key={item.id} comment={item} onSubmitComment={handleReply} />
            })}
            </div>
        </>
    )
}

export default NestedComment
