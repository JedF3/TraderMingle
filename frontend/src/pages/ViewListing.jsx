import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ViewListing = ()=>{
    const location = useLocation();
    const {id} = useParams();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [item, setItem] = useState({title:"",image:[{path:""}],category:"",price:0,description:""});
    const [itemName, setItemName]=useState("");
    const [isMyItem, setIsMyItem] = useState(false);
    const [itemSold, setItemSold] = useState(false);
    let firstRun = useRef(true);
    async function getListingifNot(){
        console.log("not");
        await axios.get("http://127.0.0.1:4000/api/v1/listings/viewListing/"+id)
        .then((result)=>{
            setItem(result.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    async function markSold(){
        await axios.put("http://127.0.0.1:4000/api/v1/listings/markSold/"+id, {}, {headers:{Authorization:`Bearer ${user.token}`}})
        .then((result)=>{
            setItemSold(true);
            alert("Item marked as sold");
        }).catch((error)=>{
            console.log(error);
        })
    }
    function gotoEdit(){
        console.log(item._id);
        navigate("../editListing/"+item._id, {state:item});
    }
    useEffect(()=>{
        if(!location.state){
            getListingifNot();
        }
        else{
            setItem(location.state);
        }
    },[]);
    useEffect(()=>{
        if(!firstRun.current){
            if(user){
                console.log("itemUserID")
                console.log(item);
                if(item.userID._id==user.id){
                    setIsMyItem(true);
                }
                else{
                    setIsMyItem(false);
                }
            }
            if(item){
                if(item.isSold){
                    setItemSold(true);
                    setItemName(item.title+"(Sold)");
                }
                else{
                    setItemSold(false);
                    setItemName(item.title);
                }
            }
        }
        else{
            firstRun.current=false;
        }
    },[item])
    useEffect(()=>{
        if(itemSold){
            setItemSold(true);
            setItemName(item.title+"(Sold)");
        }
        else{
            setItemSold(false);
            setItemName(item.title);
        }
    },[itemSold])
    return(
        <div className="listingWindow materialWhite addListingDiv">
            <div className="buttonNav">
                <button onClick={()=>{navigate(-1)}}>←Back</button>
                {isMyItem&&
                    <button onClick={markSold}>Mark as sold</button>
                }
                {isMyItem&&
                    <button onClick={gotoEdit}>Edit Listing</button>
                }
            </div>
            <h1>{itemName}</h1>
            <div className="imageInputContent">
                {item.image.map((image)=>
                <div className="imgUploadDisplay materialWhite noPointers"><img src={image.path} className="uploadThumb"/></div>
                )}
            </div>
            <div className="infoDiv">
                <div className="listingInfo">
                    <div className="categoryDiv">{item.category}</div>
                    <h3>PHP {item.price}</h3>
                    <h3>{item.description}</h3>
                </div>
                <div className="UserInfo">
                    <h1>User Info goes here</h1>
                </div>
            </div>
        </div>
    );
}
export default ViewListing;