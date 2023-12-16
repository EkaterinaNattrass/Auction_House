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
        console.log(statusCode);
        return statusCode === 200;
    }
    catch (err) {
        return false;
    }
}

module.exports = updateListing;