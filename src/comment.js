import React, { useRef, useState } from 'react';
import {ReactComponent as Replybtn} from './images/icon-reply.svg';
import {ReactComponent as Plus} from './images/icon-plus.svg';
import {ReactComponent as Minus} from './images/icon-minus.svg';
import {ReactComponent as Edit} from './images/icon-edit.svg';
import {ReactComponent as Delete} from './images/icon-delete.svg';
import NewReply from './newReply';
import DeleteModal from './deleteModal';


function Comment(props) {
  const [content,setContent] = useState(props.content);
  const [liked,setLiked] = useState(false);
  const [likes,setLikes] = useState(props.score);
  const [reply,setReply] = useState(false);
  const [edit,setEdit] = useState(false);
  const [modalActive,setModal] = useState('');
  return (
    <>
    <div className='comment-box'>
        <div className='votes'>
            <button disabled={liked?true:false} className='up' onClick={()=>{setLiked(true);
            setLikes(likes+1)}}><Plus className={`upvote ${!liked?'active':''}`}/></button>
            <div className='score'>{likes}</div>
            <button disabled={liked?false:true} className='down' onClick={()=>{setLiked(false);
            setLikes(likes-1)}}><Minus className={`downvote ${liked?'active':''}`} /></button>
        </div>
        <div className='content'>
          <div className='top-section'>
          <div className='info'>
            <div className='img'>
              <img src={require(`${props.user.image.png}`)} alt='pp'/>
              </div>
            <div className='username'>{props.user.username}
            {props.cuser.username===props.user.username?<span className='you'>you</span>:null}
            </div>
            <div className='time'>{props.createdAt}</div>
            </div>
            {props.cuser.username!==props.user.username?
            <div className='options'>
            <button className='reply-btn' onClick={()=>setReply(true)}><Replybtn /> Reply</button>
            </div>:
            <div className='options'>
            <button className='delete-btn' onClick={()=>setModal('active')}><Delete /> Delete</button>
            <button className='edit-btn' onClick={()=>setEdit(true)}><Edit /> Edit</button>
            </div>
            }
          </div>
          {!edit?
            <div className='comment'>{props.replyingTo?<span className='replyingTo'>{`@${props.replyingTo} `}</span>:null}{content}</div>
            :
            <>
            <textarea autoFocus value={content} onChange={(e)=>setContent(e.target.value)} rows={4} className='comment edit'></textarea>
            <div className='update'>
            <button onClick={()=>setEdit(false)}>Update</button>
            </div>
            </>
            }
            </div>
            <div className={`modal-overlay ${modalActive}`}>
      <DeleteModal id={props.id} deleteComment={props.deleteComment} modalActive={modalActive} setModal={setModal}/>
      </div>
    </div>
    {reply?<NewReply newids={props.newids} addReply={props.addReply} user={props.cuser} parent={props.parent} parentUsername={props.user.username} setReply={setReply}/>:null}
    
    </>
  )
}

export default Comment;