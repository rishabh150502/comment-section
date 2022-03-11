import './App.css';
import Comment from './comment';
import data from './data.json'
import { useState } from 'react';
import DeleteModal from './deleteModal';

function App() {
  const [newids, setNewid] = useState(5);
  const [user, setUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);
  const [newCommentValue, setNewComment] = useState('');

  const addReply = (id, comment) => {
    const temp = [...comments];
    const index = comments.findIndex(comment => comment.id === id);
    temp[index].replies.push(comment);
    setComments([...temp]);
    setNewid(newids + 1);
  }
  const addComment = () => {
    if (newCommentValue) {
      const temp = [...comments];
      let newComment = {
        id: newids,
        content: newCommentValue,
        createdAt: "now",
        score: 0,
        user: {
          image: {
            png: user.image.png,
            webp: user.image.webp
          },
          username: user.username
        },
        replies: []
      }
      temp.push(newComment);
      setComments([...temp]);
      setNewid(newids + 1);
      setNewComment('');
    }
  }

  const deleteComment = (id) => {
    const temp = [...comments]
    for (let i = 0; i < temp.length; i++) {
      console.log(temp[i].id);
      if (temp[i].id === id) {
        temp.splice(i, 1);
        return setComments([...temp]);
      }
      if (temp[i].replies.length !== 0) {
        for (let j = 0; j < temp[i].replies.length; j++) {
          console.log(temp[i].replies[j].id);
          if (temp[i].replies[j].id === id) {
            temp[i].replies.splice(j, 1);
            return setComments([...temp]);
          }
        }
      }
    }
    
  }
  return (
    <div className="App">
      <div className='comments'>
        {comments.map(comment =>
          comment.replies.length === 0 ? <Comment key={comment.id} {...comment} deleteComment={deleteComment} addReply={addReply} parent={comment.id} cuser={user} newids={newids} /> :
            <>
              <Comment key={comment.id} {...comment} addReply={addReply} deleteComment={deleteComment} parent={comment.id} cuser={user} newids={newids} />
              <div className='reply-box'>
                {comment.replies.map(reply => <Comment key={reply.id} {...reply} deleteComment={deleteComment} addReply={addReply} parent={comment.id} cuser={user} newids={newids} />)}
              </div>
            </>
        )}
        <div className='addCommentForm'>
          <div className='img'>
            <img src={require(`${user.image.png}`)} />
          </div>
          <textarea value={newCommentValue} onChange={(e) => setNewComment(e.target.value)} rows={4} placeholder='Add a comment...'></textarea>
          <button className='send-btn' onClick={addComment}>Send</button>
        </div>
      </div>
      {/* <div className={`modal-overlay ${modalActive}`}>
      <DeleteModal modalActive={modalActive} setModal={setModal}/>
      </div> */}
    </div>
  );
}

export default App;
