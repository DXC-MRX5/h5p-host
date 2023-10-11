import React, { useState, useEffect } from 'react'


const Register = () => {

  const [formData, setFormData]=useState({});
  const [quizShow, setQuizShow]=useState(false);
  // const [finish, setFinish] = useState(false);
  const existingUser = localStorage.getItem('User_mail');
  const [userData, setUserData] = useState({
    name: "John",
    email: "john@example.com",
  });
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  
  // Function to handle the postMessage
  const sendMessageToIframe = (data) => {
    const iframe = document.querySelector("iframe");
    if(!iframe){
      return
    }
    const wind = iframe.contentWindow;
    wind.postMessage(JSON.stringify(data), "https://dxc-mrx5.github.io/h5p_front");
  };
  // const cheeckFinish = ()=>{
  //   const abcd = document.querySelector(".greeting");
  //   if(!abcd){
  //     return
  //   }
  //   else if(abcd.innerHTML === 'Finished'){
  //     setFinish(!finish);
  //     console.log("test finished !");
  //   }
  // }
  useEffect(() => {
    // Add an event listener for the "load" event
    window.addEventListener("load", sendMessageToIframe(userData));

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("load", sendMessageToIframe(userData));
    };
  }, [userData]);

  const handleReg= async()=>{
    if(!formData.name || !formData.email || !formData.password){
      alert("All fields are required !");
    }
    else if(existingUser !== formData.email){
      const newUserData = {
        name : formData.name,
        email : formData.email
      }
      setUserData(newUserData);
      setQuizShow(true);
    }
    else alert("Existing User!")
  }
  
  return (
    <div className='register'>
        {quizShow ? null 
        : 
        <>
        <h2>Register Yourself</h2>
        <div className='box'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' onChange={handleChange} required/>
        </div>
        <div className='box'>
            <label htmlFor='email'>Email Id</label>
            <input type='email' name='email' id='email' onChange={handleChange} required/>
        </div>
        <div className='box'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={handleChange} required/>
        </div>
        <button className='Btn' onClick={handleReg}>Register</button></>}
        <iframe src="https://dxc-mrx5.github.io/h5p_front" title='Quiz-Frame' id='quizFrame' style={{display : quizShow ? "block" : "none"}}></iframe>
    </div>
  )
}

export default Register