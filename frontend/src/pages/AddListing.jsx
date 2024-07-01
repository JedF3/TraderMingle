import { useEffect, useState } from "react";
import Select from "react-select";
const AddListing = ()=>{
    let [listingName, setListingName] = useState("");
    let [listingDescription, setListingDescription] = useState("");
    let [listingPrice, setListingPrice] = useState(0);
    let [listingCategory, setListingCategory] = useState("");
    let defaultImgURL="/img/addImg.png"
    let [displayImg1, setDisplayImg1] = useState(defaultImgURL);
    let [displayImg2, setDisplayImg2] = useState(defaultImgURL);
    let [displayImg3, setDisplayImg3] = useState(defaultImgURL);
    let [displayImg4, setDisplayImg4] = useState(defaultImgURL);
    let [selectedImg1, setSelectedImg1] = useState(null);
    let [selectedImg2, setSelectedImg2] = useState(null);
    let [selectedImg3, setSelectedImg3] = useState(null);
    let [selectedImg4, setSelectedImg4] = useState(null);
    let [imgErr, setImgErr] = useState(false);
    let [catErr, setCatErr] = useState(false);
    let [selectedImages, setSelectedImages] = useState([]);
    const selectOptions = [
        {value:"Cars and car parts", label:"Cars and car parts"},
        {value:"Computers", label:"Computers"},
        {value:"Gadgets", label:"Gadgets"},
        {value:"Home Improvement", label:"Home Improvement"},
        {value:"Appliances", label:"Appliances"},
    ];
    function getImgPath1(e){
        if(e.target.files&&e.target.files[0]){
            setDisplayImg1(URL.createObjectURL(e.target.files[0]));
            setSelectedImg1(e.target.files[0]);
            setImgErr(false);
        }
    }
    function getImgPath2(e){
        if(e.target.files&&e.target.files[0]){
            setDisplayImg2(URL.createObjectURL(e.target.files[0]));
            setSelectedImg2(e.target.files[0]);
            setImgErr(false);
        }
    }
    function getImgPath3(e){
        if(e.target.files&&e.target.files[0]){
            setDisplayImg3(URL.createObjectURL(e.target.files[0]));
            setSelectedImg3(e.target.files[0]);
            setImgErr(false);
        }
    }
    function getImgPath4(e){
        if(e.target.files&&e.target.files[0]){
            setDisplayImg4(URL.createObjectURL(e.target.files[0]));
            setSelectedImg4(e.target.files[0]);
            setImgErr(false);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        let tempImgArray = [selectedImg1, selectedImg2, selectedImg3, selectedImg4];
        let filteredExistImg = tempImgArray.filter((img)=>img!=null)
        if(!filteredExistImg.length||!listingCategory){
            if(!filteredExistImg.length){
                setImgErr(true);
            }
            if(!listingCategory){
                setCatErr(true);
            }
        }
        else{
            //proc
        }
        
        console.log('lol')
    }
    useEffect(()=>{console.log(listingCategory)},[listingCategory])
    return (
        <form className="listingWindow materialWhite addListingDiv" onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="imageInputContent">
                <input type="file" id="imgUpload1" onChange={(e)=>{getImgPath1(e)}} className="imgUpload"></input>
                <label htmlFor="imgUpload1">
                    <div className="imgUploadDisplay materialWhite noPointers"><img src={displayImg1} className="uploadThumb"/></div>
                </label>
                <input type="file" id="imgUpload2" onChange={(e)=>{getImgPath2(e)}} className="imgUpload"></input>
                <label htmlFor="imgUpload2">
                    <div className="imgUploadDisplay materialWhite noPointers"><img src={displayImg2} className="uploadThumb"/></div>
                </label>
                <input type="file" id="imgUpload3" onChange={(e)=>{getImgPath3(e)}} className="imgUpload"></input>
                <label htmlFor="imgUpload3">
                    <div className="imgUploadDisplay materialWhite noPointers"><img src={displayImg3} className="uploadThumb"/></div>
                </label>
                <input type="file" id="imgUpload4" onChange={(e)=>{getImgPath4(e)}} className="imgUpload"></input>
                <label htmlFor="imgUpload4">
                    <div className="imgUploadDisplay materialWhite noPointers"><img src={displayImg4} className="uploadThumb"/></div>
                </label>
            </div>
            {imgErr&&
                <h3 className="error">Select an Image</h3>
            }
            <h2>Listing Name</h2>
            <input type="text" onChange={(e)=>{setListingName(e.target.value)}} required></input>
            <h3>Description</h3>
            <input type="text" onChange={(e)=>{setListingName(e.target.value)}} required></input>
            <h3>Price</h3>
            <input type="number" onChange={(e)=>{setListingName(e.target.value)}} required></input>
            <h3>Category</h3>
            {/* <select id="category">
                <option value="Cars and car parts">Cars and car parts</option>
                <option value="Computers">Computers</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Home Improvement">Home Improvement</option>
                <option value="Appliances">Appliances</option>
            </select>
             */}
             <div className="categorySelect">
                <Select options={selectOptions} onChange={(choice)=>{setListingCategory(choice.value); setCatErr(false)}} isSearchable={false}/>
             </div>
             {catErr&&
                <h3 className="error">Select a category</h3>
             }
            <button className="addButton" type="submit">Add a listing!</button>
        </form>
    );
}

export default AddListing;