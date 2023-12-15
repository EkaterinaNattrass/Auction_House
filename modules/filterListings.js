const filterListings = async function (token, tag) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings?_tag=' + tag ;
    const bearerToken= 'Bearer ' + token;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
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