const filterListings = async function (tag) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings?_tag=' + tag ;
    
    const options = {
        method: 'GET'
    };
    
    try {
        const res = await fetch(url, options);
        const listings = await res.json();
        const filteredListings = listings.filter ((listing) =>  {
            if (listing.tags.includes(tag)) {return listing}
        })
        return filteredListings;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = filterListings;