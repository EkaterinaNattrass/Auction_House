const placeBid = async function(bid, id, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/listings/' + id + '/bids';
    
    returnObj = {
        'success': false,
        'amount': "",
        'error': ""
    }

    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify({"amount": parseInt(bid)})
    };

    try {
        const res = await fetch(url, options);
        const bid = await res.json();
        console.log(bid);
        statusCode = res.status;
        
        return statusCode === 200;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};
 
module.exports = placeBid;