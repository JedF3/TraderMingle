import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatPerson = ({userInfo})=>{
    const navigate = useNavigate();
    // useEffect(()=>{
    //     console.log(userInfo)
    // }, [])
    return(
        <div className="chatPersonDiv" onClick={()=>{navigate("/messages/"+userInfo._id, {state:userInfo})}}>
            <img src={userInfo.image?userInfo.image.path:""}></img>
            <h3>{userInfo.username}</h3>
        </div>
    );
}

export default ChatPerson