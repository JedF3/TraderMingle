import { Router } from "express";
import { addListing, deleteListing, editListing, getListings, searchForListing, viewOneListing } from "../controllers/listing.controller.js";
import multer from "multer";
import {storage} from "../config/listingStorage.js";

const baseURL="/api/v1/users";
const listingsRouter = Router();
const listingImages = multer({storage})
listingsRouter.post("/addListing", listingImages.array("listing-img"), addListing);
listingsRouter.get("/viewListing", getListings);
listingsRouter.get("/viewListing/:id", viewOneListing);
listingsRouter.get("/search/:searchTerm", searchForListing);
listingsRouter.put("/editListing/:id", listingImages.array("listing-img"), editListing);
listingsRouter.put("/deleteListing/:id", deleteListing);
export default listingsRouter;