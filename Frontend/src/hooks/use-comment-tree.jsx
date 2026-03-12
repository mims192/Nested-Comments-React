import React, { useState } from 'react'

const usecommenttree = (initialComments) => {
  const [comments, setComments] = useState(initialComments)

  const insertNode = (tree, commmentId, newcomm) => { //comment tree
    return tree.map(comment => {
      if (comment.id === commmentId) {
        return {
          ...comment,  //copy existing comment
          replies: [...comment.replies, newcomm]
        }
      }
      else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,  //keep the same comment properties and only update replies
          replies: insertNode(comment.replies, commmentId, newcomm)
        }
      }
      return comment
    })
  }
  const insertComment = (commmentId, content) => {
    const newComments = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toLocaleString(),
      replies: []
    }
    if (commmentId) {
      setComments((prevComments) => insertNode(prevComments, commmentId, newComments))

    }
    else {       //global comment
      setComments(prevComments => [newComments, ...prevComments])
    }
  }


  const editNode = (tree, commmentId, content) => { //comment tree
    return tree.map(comment => {
      if (comment.id === commmentId) {
        return {
          ...comment,  //copy existing comment
          content,    //or content:content(new content basicallly)
          timestamp: new Date().toISOString()
        }
      }
      else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,  //keep the same comment properties and only update replies
          replies: editNode(comment.replies, commmentId, content)
        }
      }
      return comment
    })
  }
  const editComment = (commmentId, content) => {

    setComments((prevComments) => editNode(prevComments, commmentId, content))

  }

  const deleteNode = (tree, commmentId) => { //comment tree
    return tree.reduce((acc,comment) => {
      if (comment.id === commmentId) {
        return acc
      }
      else if (comment.replies && comment.replies.length > 0) {
        comment.replies= deleteNode(comment.replies, commmentId)
      }

      return [...acc,comment]
    },[])
  }
  const deleteComment = (commmentId) => {

    setComments((prevComments) => deleteNode(prevComments, commmentId))

  }
  return { comments, insertComment, editComment,deleteComment }
}

export default usecommenttree
