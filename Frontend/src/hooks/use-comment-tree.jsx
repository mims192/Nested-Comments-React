import React, { useState } from 'react'

const usecommenttree = (initialComments) => {
    const [comments,setComments]=useState(initialComments)

    const insertNode=(tree,commmentId,newcomm)=>{ //comment tree
      return tree.map(comment =>{
        if(comment.id===commmentId){
          return{
            ...comment,  //return the current comment if match
            replies:[...comment.replies,newcomm]
          }
        }
        else if(comment.replies && comment.replies.length>0){
           return{
            ...comment,  //return the current comment if match
            replies:insertNode(comment.replies,commmentId,newcomm)
          }  
        }
        return comment
      })
    }
    const insertComment=(commmentId,content)=>{
      const newComments={
      id:Date.now(),
      content,
      votes:0,
      timestamp:new Date().toLocaleString(),
      replies:[]
    }
      if(commmentId){
        setComments((prevComments)=>insertNode(prevComments,commmentId,newComments))

      }
      else{
        setComments(prevComments=>[newComments,...prevComments])
      }
    } 
  return (
    {comments,insertComment}
  )
}

export default usecommenttree
