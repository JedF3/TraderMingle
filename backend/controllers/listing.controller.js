import listings from "../models/listing.model.js";

const getListings = async(req, res, next)=>{
    const allListings = await listings.find();
    res.status(200).send({message:"Retrieved all listings", data:allListings});
};

const searchForListing = async(req, res, next)=>{
    const searchTerm = new RegExp(req.params.searchTerm);
    const searchedListings = await listings.find({$or:[{title:{$regex:searchTerm}}, {description:{$regex:searchTerm}}]});
    res.status(200).send({message:"Retrieved all listings", data:searchedListings});
};

const addListing = async(req, res, next)=>{
    const {userID, title, description, price, category, isSold, createDate} = req.body;
    let newListing;
    if(req.files){
        newListing = new listings({
            userID,
            title,
            description,
            price,
            image:req.files.map((image)=>{return {
                path:image.path,
                filename:image.filename
            }}),
            category,
            isSold,
            createDate
        })
    }
    else{
        newListing = new listings({
            userID,
            title,
            description,
            price,
            category,
            isSold,
            createDate
        })
    }
    await newListing.save();
    res.status(201).send({message:"New listing posted!", data:newListing});
}
const viewOneListing = async(req, res, next)=>{
    const selectedListing = await listings.findOne({_id:req.params.id}).populate({path:"userID", select:"username"});
    res.status(200).send({message:"Retrieved Listing", data:selectedListing});
}

const editListing = async(req, res, next)=>{
    const listingID = req.params.id;
    const target = await listings.findOne({_id:listingID});
    if(target){
        const {title, description, price, category, isSold}=req.body;
        async function updateEntry(){
            await listings.updateOne({_id:listingID},{
                $set:{
                    title,
                    description,
                    price,
                    category,
                    isSold,
                    image:req.files.map((image)=>{return {
                        path:image.path,
                        filename:image.filename
                    }}),
                }
            })
        }
        updateEntry();
        res.status(200).send({message:"Listing Edited"});  
    }
    else{
        res.status(404).send({Message:"Target not found"});
    }
}
const deleteListing = async(req, res, next)=>{
    const listingID = req.params.id;
    const target = await listings.findOne({_id:listingID});
    if(target){
        await listings.delete({_id:listingID});
        res.status(200).send({Message:"Listing has been deleted"});
    }
    else{
        res.status(404).send({message:"Listing not found"});
    }
}
export {getListings, addListing, viewOneListing, editListing, searchForListing, deleteListing};