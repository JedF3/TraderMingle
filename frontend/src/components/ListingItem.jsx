const ListingItem = (listing)=>{
    console.log(listing)
    const item = listing.listing;
    return (
        <div className="listingItem materialWhite">
            <img className="Thumbnail" src={item.image[0].path}></img>
            <h3>{item.title}</h3>
            <h3>PHP {item.price}</h3>
        </div>
    );
}

export default ListingItem