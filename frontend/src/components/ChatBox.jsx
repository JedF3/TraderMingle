import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ChatBox = ()=>{
    let msgDestination="66872612835444fa55b28747";
    let location = useLocation();
    const [destination, setDestination] = useState(location.state);
    const {user} = useAuthContext();
    let [msgBody, setMsgBody] = useState("");
    let firstRun = useRef(true);
    let [chatHistory, setChatHistory] = useState([]);
    const toUserClass = "toUserBaloon"
    const fromUserClass = "fromUserBaloon"
    function sendMessage(e){
        
        if(e.keyCode==13){
            console.log(e.target.value)
            setMsgBody("");
            socket.emit("newMsg", {fromUser:user.id, toUser:destination._id, messageBody:msgBody});
            getHistory();
        }
    }
    async function getHistory(){
        await axios.post("http://127.0.0.1:4000/api/v1/chat/getHistory/", {
            fromUser:user.id,
            toUser:destination._id
        }, {headers:{Authorization:`Bearer ${user.token}`}})
        .then((result)=>{
            console.log(result.data.data);
            setChatHistory(result.data.data);
        })
    }
    socket.on("pvt_msg", (data)=>{
        getHistory();

    })
    useEffect(()=>{
        getHistory();
        console.log(destination);
    },[])
    useEffect(()=>{
        let historyWindow = document.getElementById("chatHistoryContent");
        historyWindow.scrollTop = historyWindow.scrollHeight;
    },[chatHistory])
    return(
        <div className="chatHistory">
            <header className="chatHistoryHeader"><h3>{destination.username}</h3></header>
            <div className="chatHistoryContent" id="chatHistoryContent">
                {chatHistory.map((message)=><div className={message.fromUser==user.id?fromUserClass:toUserClass}><h3>{message.messageBody}</h3></div>)}
            </div>
            <footer className="chatInputFooter">
                <input type="text" className="chatInput" value={msgBody} onChange={(e)=>{setMsgBody(e.target.value)}} onKeyDown={(e)=>{sendMessage(e)}}></input>
            </footer>
        </div>
    );
}

export default ChatBox;