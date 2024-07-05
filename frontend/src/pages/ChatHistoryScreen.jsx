import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import ChatPerson from "../components/ChatPerson";

const ChatHistoryScreen = ()=>{
    let {user}=useAuthContext();
    let [chatUsers, setChatUsers] = useState([]);
    let [chatUserIDs, setChatUserIDs] = useState([]);
    let firstRun = useRef(true);
    async function getChatHistory(){
        await axios.post("http://127.0.0.1:4000/api/v1/chat/getUserChatHistory/", {selectedUser:user.id}, {headers:{Authorization:`Bearer ${user.token}`}})
        .then((result)=>{
            setChatUserIDs(result.data.data);
        })
    }
    async function getTargetUser(){
        let tempArray = [...chatUsers]
        for await(const userID of chatUserIDs){
            await axios.get("http://127.0.0.1:4000/api/v1/user/profile/"+userID)
            .then((result)=>{
                
                tempArray.push(result.data);
            })
            .catch((error)=>{console.log("Deleted User ID detected")});
        }
        setChatUsers(tempArray);
    }
    useEffect(()=>{
        getChatHistory();
    },[])
    useEffect(()=>{
        if(!firstRun.current){
            getTargetUser();
        }
        else{
            firstRun.current=false;
        }
    }, [chatUserIDs])
    return(
        <div className="chatHistoryScreenDiv">
            {/* {
                chatUserIDs.map((uid)=><ChatPerson id={uid}/>)
            } */}
            {
                chatUsers.map((userInfo)=><ChatPerson userInfo={userInfo}/>)
            }
        </div>
    );

}
export default ChatHistoryScreen