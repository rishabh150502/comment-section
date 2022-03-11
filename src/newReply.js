import React, { useState } from 'react';

function NewReply(props) {
    const [value,setValue] = useState('');
    const handleReply =()=>{
      const temp = {
        id: props.newids,
        content: value,
        createdAt: "now",
        score: 0,
        replyingTo: props.parentUsername,
        user: {
        image: { 
        png: props.user.image.png,
        webp: props.user.image.webp
          },
            username: props.user.username
          }
      }
      props.addReply(props.parent,{...temp});
      props.setReply(false);
    }
  return (
    <div className='new-reply'>
        <div className='img'>
            <img src={require(`${'./images/avatars/image-juliusomo.png'}`)} alt='pp' />
        </div>
        <textarea value={`${value}`} onChange={(e)=>setValue(e.target.value)} cols={10} rows={4} autoFocus></textarea>
        <div className='buttons'>
        <button onClick={handleReply}>Reply</button>
        <button onClick={()=>props.setReply(false)} className='cancel'>Cancel</button>
        </div>
    </div>
  )
}

export default NewReply;