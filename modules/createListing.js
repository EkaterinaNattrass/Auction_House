const createListing = async function(listingData, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings';
    const imgUrl = 'https://unsplash.com/photos/gold-and-silver-steel-wall-decor-tszceVXBPos';
    

    const bearerToken = 'Bearer ' + token;

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
        statusCode = res.status;
        console.log(listingData);
        return statusCode === 200;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};
 
module.exports = createListing;
