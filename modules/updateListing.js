const updateListing = async function(updatedListing, id, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings/' + id;

    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify(updatedListing) 
    };

    try {
        const res = await fetch(url, options);
        const updatedListing = await res.json();
        statusCode = res.status;
        console.log(updatedListing);
        return statusCode === 200;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
}

module.exports = updateListing;