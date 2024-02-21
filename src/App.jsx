import React, { useEffect, useState } from 'react'
import { auth, db, google_provider } from './Config/Firebase/firebase'
import { onChildAdded, push, ref, set } from 'firebase/database'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const App = () => {
  const [user, setName] = useState("")
  const [chat, setChat] = useState([

  ])
  const postListRef = ref(db, 'messages');


  const [msg, setMsg] = useState('')
  useEffect(() => {
    onChildAdded(postListRef, (data) => {
      //     const c =
      // c.push(data.val())
      setChat(chat => [...chat, data.val()])
      setMsg("")
    });


  }, [])

  const send_Chat = () => {


    const newPostRef = push(postListRef);
    set(newPostRef, {
      user, message: msg

    });





    // const c=[...chat]
    // c.push({name:name,message:msg})
    // setChat(c)
    // setMsg('')

  }

  const google_login = () => {
    signInWithPopup(auth, google_provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, token);
        setName({name:result.user.displayName,email:result.user.email})
        // IdP data available using getAdditionalUserInfo(result)
        // ....
        const isLogddine = localStorage.setItem('isLogddine',true)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const isLogddine = localStorage.getItem('isLogddine')


  return (
    <>
      <div className='container mt-3.5'>


        {user.email  ? <div>
          <div>

<div>
  <h1 className='text-4xl	'> User Name:{user.name}</h1>
</div>
<br />
{
  chat.map((c, i) => <div className={`chat chat-start my-4 me ${c.user.email === user.email ? 'chat-end' : 'chat-start'}`}>

    <div key={i} className="chat-bubble  flex  	">
      <strong>{c.user.name}:</strong>
      <p>{c.message}</p>
    </div>
  </div>

  )
}
<div className='fixed w-full bottom-0  flex flex-row grow'>
  <input onInput={e => setMsg(e.target.value)}
    value={msg} className='input border-2 border-black grow py-2.5 mx-2'
    type="text" placeholder='Enter The Message' />
  <button onClick={e => send_Chat()} className='py-2.5 btn btn-neutral me-2'>Send</button>
</div>




</div>
        </div> :
          <div>
            {/* <input onBlur={e => setName(e.target.value)} type="text" placeholder="Enter Name + Tab" className="input input-bordered w-full max-w-xs" /> */}
            <div>
              <button className='btn btn-natural' onClick={e => { google_login() }}>Singin Wirh Google</button>
            </div>

          </div>}


        {/* {user.email ? <div>

          <div>
            <h1 className='text-4xl	'> User Name:{user.name}</h1>
          </div>
          <br />
          {
            chat.map((c, i) => <div className={`chat chat-start my-4 me ${c.user.email === user.email ? 'chat-end' : 'chat-start'}`}>

              <div key={i} className="chat-bubble  flex  	">
                <strong>{c.user.name}:</strong>
                <p>{c.message}</p>
              </div>
            </div>

            )
          }
          <div className='fixed w-full bottom-0  flex flex-row grow'>
            <input onInput={e => setMsg(e.target.value)}
              value={msg} className='input border-2 border-black grow py-2.5 mx-2'
              type="text" placeholder='Enter The Message' />
            <button onClick={e => send_Chat()} className='py-2.5 btn btn-neutral me-2'>Send</button>
          </div>




        </div> : null} */}







      </div>


    </>
  )
}

export default App