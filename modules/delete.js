
const deleteListing = async function( id, token) {

    url = 'https://api.noroff.dev/api/v1/auction/listings/' + id; 
    const bearerToken = 'Bearer ' + token;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        }
    };

    try {
        const res = await fetch(url, options);
        const deletedListing = await res.json();  
        return deletedListing;
    } catch(err)  {
        console.log('error:' + err + err.status);
    }
}

module.exports = deleteListing;