import { useContext, useEffect, useRef, useState } from "react";
import ListingItem from "../components/ListingItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import searchTermContext from "../context/searchTermContext";

const ListingScreen = ()=>{
    const location = useLocation();
    const {searchTerm} = useContext(searchTermContext);
    const [searchResults, setSearchResults] = useState([]);
    let firstRun = useRef("true");
    let navigate = useNavigate();
    async function getSearchItems(){
        console.log(searchTerm);
        axios.get("http://127.0.0.1:4000/api/v1/listings/search/"+searchTerm)
        .then((result)=>{
            setSearchResults(result.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    async function getAllItems(){
        axios.get("http://127.0.0.1:4000/api/v1/listings/viewAllListings/")
        .then((result)=>{
            setSearchResults(result.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        if(searchTerm){
            getSearchItems();
        }
        else{
            getAllItems();
        }
    },[])
    useEffect(()=>{
        if(!firstRun.current){
            getSearchItems();
        }
        else{
            firstRun.current=false;
        }
    },[searchTerm])
    useEffect(()=>{console.log(searchResults)}, [searchResults])
    return(
        <div className="listingWindow">
            {searchResults.length&&
                searchResults.map((listing)=><ListingItem listing={listing}/>)
            }
            {!searchResults.length&&
                <div className="materialWhite"><h2>No results for search term</h2></div>
            }
        </div>
    );
}
export default ListingScreen;