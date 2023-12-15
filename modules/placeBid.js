const placeBid = async function(amount, id, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings/' + id + '/bids';
    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify({"amount": amount})
    };

    try {
        const res = await fetch(url, options);
        const amount = await res.json();
        console.log(amount);
        statusCode = res.status;
        
        return statusCode === 200;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};
 
module.exports = placeBid;