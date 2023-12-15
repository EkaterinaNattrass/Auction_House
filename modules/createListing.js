const createListing = async function(listingData, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings';
    const bearerToken= 'Bearer ' + token;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify(listingData) 
    };

    try {
        const res = await fetch(url, options);
        const listingData = await res.json();
        console.log(listingData);
        return listingData;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};
 
module.exports = createListing;

