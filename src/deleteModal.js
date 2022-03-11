import React from 'react'

function DeleteModal(props) {
  return (
    <div className={`delete-modal ${props.modalActive}`}>
        <h3>Delete comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className='buttons'>
            <button className='cancel' onClick={()=>props.setModal('')}>No, Cancel</button>
            <button className='confirm' onClick={()=>{props.deleteComment(props.id);
            props.setModal('')}}>Yes, Delete</button>
        </div>
    </div>
  )
}

export default DeleteModal;