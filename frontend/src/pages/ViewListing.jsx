import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";

const ViewListing = ()=>{
    const location = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(location.state);

    async function getListingifNot(){
        await axios.get("http://127.0.0.1:4000/api/v1/listings/viewOneListing/"+id)
        .then((result)=>{
            setItem(result.data.data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(!location.state.title){
            getListingifNot();
        }
    },[]);
    return(
        <div className="listingWindow materialWhite addListingDiv">
            <button onClick={()=>{navigate(-1)}}>←Back</button>
            <h1>{item.title}</h1>
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