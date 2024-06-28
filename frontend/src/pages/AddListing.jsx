import { useState } from "react";

const AddListing = ()=>{
    let [listingName, setListingName] = useState("");
    let [listingDescription, setListingDescription] = useState("");
    let [listingPrice, setListingPrice] = useState(0);
    let [listingCategory, setListingCategory] = useState("");
    function getImgPath(e){
        if(e.target.files&&e.target.files[0]){
            // setDisplayImg(URL.createObjectURL(e.target.files[0]));
            // setSelectedImg(e.target.files[0]);
            // setImgAdded(true);
        }
    }
    return (
        <div className="listingWindow materialWhite addListingDiv">
            <div className="imageInputContent">
                <input type="file" id="imgUpload1" onChange={(e)=>{getImgPath(e)}}></input>
                <label htmlFor="imgUpload1">
                    <div className="listingItem materialWhite"></div>
                </label>
                <input type="file" id="imgUpload1" onChange={(e)=>{getImgPath(e)}}></input>
                <label htmlFor="imgUpload2">
                    <div className="listingItem materialWhite"></div>
                </label>
                <input type="file" id="imgUpload1" onChange={(e)=>{getImgPath(e)}}></input>
                <label htmlFor="imgUpload3">
                    <div className="listingItem materialWhite"></div>
                </label>
                <input type="file" id="imgUpload1" onChange={(e)=>{getImgPath(e)}}></input>
                <label htmlFor="imgUpload4">
                    <div className="listingItem materialWhite"></div>
                </label>
            </div>
            <h2>Listing Name</h2>
            <input type="text"></input>
            <h3>Description</h3>
            <input type="text"></input>
            <h3>Price</h3>
            <input type="number"></input>
            <h3>Category</h3>
            <select id="category">
                <option value="Cars and car parts">Cars and car parts</option>
                <option value="Computers">Computers</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Home Improvement">Home Improvement</option>
                <option value="Appliances">Appliances</option>
            </select>
            <button className="addButton">Add a listing!</button>
        </div>
    );
}

export default AddListing;