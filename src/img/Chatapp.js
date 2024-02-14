import React, { useState,useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsFillChatSquareFill } from "react-icons/bs";
import Jack from '../img/jack2.jpg'
import Dpprofile from '../img/Dpprofile.avif'
import sawyer2 from '../img/sawyer2.jpg'
import kate from '../img/kate.jpg'
import { RiSendPlane2Fill } from "react-icons/ri";
import desmond from '../img/desmond.jpg'
import krish from '../img/krish2.jpg'
// import ScriptTag from 'react-script-tag';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Chatbot.css'

function Chatapp()
{
    const [Chat, setChat] = useState({

        chat1: true,
        chat2: false,
        chat3: false,
        chat4: false,
        chat5: false,
    })
    
    const [message, setMessage] = useState( {name:""})
    const use = []
    // const msg = []
    // const names =[]
    // console.log(message.name)
    
    const Inboxchats = () => {
        // event.preventDefault()
        use.push(message.name)
        setMessage({ name: "" })    
        console.log(use)
    } 
    
    

    const increment = () => {
        setChat({chat1: true,chat2: false,chat3: false,chat4: false,chat5: false})}
    const incrementone = () => {
        setChat({ chat1: false, chat2: true, chat3: false, chat4: false, chat5: false })
    }
    const incrementtwo = () => {
        setChat({ chat1: false, chat2: false, chat3: true, chat4: false, chat5: false })
    }
    const incrementthree = () => {
        setChat({ chat1: false, chat2: false, chat3: false, chat4: true, chat5: false })
    }
    const incrementfour = () => {
        setChat({ chat1: false, chat2: false, chat3: false, chat4: false, chat5: true })
    }
    
    
  return (
    <div>
    <div>
        <Container fluid>
            <Row>
                <Col lg={3} md={3} sm={12} xs={12} xl={3} xxl={3}>
                    
                    <div className="flex">
                    <div>
                            <BsFillChatSquareFill />
                        </div>
                        <div>
                        <p>Chats</p>
                        </div>
                        
                    </div>
                    {/* My profile */}
                    <div style={{
                        backgroundColor: '#34495e',
                        textAlign: 'center',borderRadius:'15px',padding:'5px'
                    }}>
                    <img src={Dpprofile} alt='jack' height={'120px'}
                            width={'130px'} style={{ borderRadius: '150px' }} /> 
                        <p className='profile'>Will Smith</p>
                    </div>

                    
                    {/* chats */}
                          <div className='chathead mt-3'>
                              
                              <div className=' chattitle mt-2'
                                style={{backgroundColor:'#34495e'}}  onClick={increment}>
                            <div className='mt-1'>
                                <img src={Jack} alt='jack' height={'50px'}
                                    width={'50px'} style={{borderRadius:'30px'}}/>
                            </div>
                            <div className='chatname'>
                                <p>Jack</p>
                            </div>
                        </div>

                        <div className=' chattitle ' onClick={incrementone}>
                            <div className='mt-4'>
                                <img src={sawyer2} alt='jack' height={'50px'}
                                    width={'50px'} style={{borderRadius:'30px'}}/>
                            </div>
                            <div className='chatname'>
                                <p>Sawyer</p>
                            </div>
                        </div>

                        <div className=' chattitle ' onClick={incrementtwo}>
                            <div className='mt-4'>
                                <img src={kate} alt='jack' height={'50px'}
                                    width={'50px'} style={{borderRadius:'30px'}}/>
                            </div>
                            <div className='chatname'>
                                <p>Kate</p>
                            </div>
                        </div>

                        <div className=' chattitle ' onClick={incrementthree}>
                            <div className='mt-4'>
                                <img src={krish} alt='jack' height={'50px'}
                                    width={'50px'} style={{borderRadius:'30px'}}/>
                            </div>
                            <div className='chatname'>
                                <p>Boone</p>
                            </div>
                        </div>

                        <div className=' chattitle ' onClick={incrementfour}>
                            <div className='mt-4'>
                                <img src={desmond} alt='jack' height={'50px'}
                                    width={'50px'} style={{borderRadius:'30px'}}/>
                            </div>
                            <div className='chatname'>
                                <p>Desmond</p>
                            </div>
                        </div>
                  </div>
                </Col>

                <Col lg={9} md={9} sm={12} xs={12} xl={9} xxl={9}>
                    
                          <div>
                              {/*chatl  */}
                                    <div className={Chat.chat1 ? "chatbox" : "chatboxnull"}>   
                                         
                                        <div className='chathouse mt-5'>
                                        
                                      <div className='chatroom'>
                                        <img src={Jack} alt='jack' height={'100px'}
                                        width={'100px'} style={{ borderRadius: '60px' }} />
                                          <p>Jack</p>
                                          <h3 className='online '>online</h3>
                                      </div>
                                                                                                             
                                      <div>                                         
                                               {                                  
                                      use.map((msg) =>
                                      {
                                  console.log(use)              
                                          return (<h1>{msg.name}</h1>)
                                      })    
                                  }                                              
                              </div>

                              <div className='textbox'> 
                                <span>
                                    <input type={'text'} placeholder={'Write a message here...'}
                                                  onChange={(e) =>{ setMessage({ name: e.target.value })}}
                                                  value={message.name} />
                                </span>
                                <span>
                                        <button type={'button'}
                                                  className='buttonbg'
                                           onClick={Inboxchats}>
                                              send<RiSendPlane2Fill /></button>
                                </span>
                                </div>        
                                      </div>    
                              </div>                  
                                                                                        
                                                                                        
                              {/* chat2 */}
                              <div className={Chat.chat2 ? "chatbox" : "chatboxnull"}>   
                                         
                                         <div className='chathouse mt-5'>
                                         
                                       <div className='chatroom'>
                                         <img src={sawyer2} alt='jack' height={'100px'}
                                         width={'100px'} style={{ borderRadius: '60px' }} />
                                           <p>Sawyer</p>
                                           <h3 className='online'>online</h3>
                                       </div>
                                                                        
                                       <div className='mb-5'>                                         
                                               {                                  
                                      use.map((msg) =>
                                      {
                                  console.log(use)              
                                          return (<h1>{msg.name}</h1>)
                                      })    
                                  }                                              
                              </div> 
                                                                                                                                                                                                                                                         
                                 <div className='textbox '> 
                                 <span>
                                     <input type={'text'} placeholder={'Write a message here...'}
                                                   onChange={(e) =>{ setMessage({ ...message, name: e.target.value })}}
                                                   value={message.name} />
                                 </span>
                                 <span>
                                         <button type={'button'}
                                                   className='buttonbg'
                                            onClick={Inboxchats}>
                                               send<RiSendPlane2Fill /></button>
                                 </span>
                                 </div>
                                     
                                   </div>    
                               </div> 

                              {/* chat3 */}
                              <div className={Chat.chat3 ? "chatbox" : "chatboxnull"}>   
                                         
                                         <div className='chatroom mt-5'>
                                         
                                       <div>
                                         <img src={kate} alt='jack' height={'100px'}
                                         width={'100px'} style={{ borderRadius: '60px' }} />
                                           <p>Kate</p>
                                           <h3 className='online'>online</h3>
                                       </div>
                                                                        
                                       <div className='mb-5'>                                         
                                               {                                  
                                      use.map((msg) =>
                                      {
                                  console.log(use)              
                                          return (<h1>{msg.name}</h1>)
                                      })    
                                  }                                              
                              </div>
                                                                                                                                                                                                                                                         
                                 <div className='textbox '> 
                                 <span>
                                     <input type={'text'} placeholder={'Write a message here...'}
                                                   onChange={(e) =>{ setMessage({ ...message, name: e.target.value })}}
                                                   value={message.name} />
                                 </span>
                                 <span>
                                         <button type={'button'}
                                                   className='buttonbg'
                                            onClick={Inboxchats}>
                                               send<RiSendPlane2Fill /></button>
                                 </span>
                                 </div>
                                     
                                   </div>    
                               </div> 

                              {/* chat4 */}
                              <div className={Chat.chat4 ? "chatbox" : "chatboxnull"}>   
                                         
                                         <div className='chatroom mt-5'>
                                         
                                       <div>
                                         <img src={krish} alt='jack' height={'100px'}
                                         width={'100px'} style={{ borderRadius: '60px' }} />
                                           <p>Boone</p>
                                           <h3 className='online'>online</h3>
                                       </div>
                                                                        
                                       <div className='mb-5'>                                         
                                               {                                  
                                      use.map((msg) =>
                                      {
                                  console.log(use)              
                                          return (<h1>{msg.name}</h1>)
                                      })    
                                  }                                              
                              </div>
                                                                                                                                                                                                                                                         
                                 <div className='textbox '> 
                                 <span>
                                     <input type={'text'} placeholder={'Write a message here...'}
                                                   onChange={(e) =>{ setMessage({ ...message, name: e.target.value })}}
                                                   value={message.name} />
                                 </span>
                                 <span>
                                         <button type={'button'}
                                                   className='buttonbg'
                                            onClick={Inboxchats}>
                                               send<RiSendPlane2Fill /></button>
                                 </span>
                                 </div>
                                     
                                   </div>    
                               </div> 

                              {/*chat5  */}
                              <div className={Chat.chat5 ? "chatbox" : "chatboxnull"}>   
                                         
                                         <div className='chatroom mt-5'>
                                         
                                       <div>
                                         <img src={desmond} alt='jack' height={'100px'}
                                         width={'100px'} style={{ borderRadius: '60px' }} />
                                           <p>Desmond</p>
                                           <h3 className='online'>online</h3>
                                       </div>
                                                                        
                                       <div className='mb-5'>                                         
                                               {                                  
                                      use.map((msg) =>
                                      {
                                  console.log(use)              
                                          return (<h1>{msg.name}</h1>)
                                      })    
                                  }                                              
                              </div>
                                                                                                                                                                                                                                                         
                                 <div className='textbox '> 
                                 <span>
                                     <input type={'text'} placeholder={'Write a message here...'}
                                                   onChange={(e) =>{ setMessage({ ...message, name: e.target.value })}}
                                                   value={message.name} />
                                 </span>
                                 <span>
                                         <button type={'button'}
                                                   className='buttonbg'
                                            onClick={Inboxchats}>
                                               send<RiSendPlane2Fill /></button>
                                 </span>
                                 </div>
                                     
                                   </div>    
                               </div> 
                         
                    </div>    
                </Col>
            </Row>
        </Container>
    </div>
</div>
  )
}

export default Chatapp;