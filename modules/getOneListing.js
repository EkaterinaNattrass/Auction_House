const getOneListing = async function (id) {

    url = 'https://api.noroff.dev/api/v1/auction/listings/' + id + '?_bids=true';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
        try {
            const res = await fetch(url, options);
            const data = await res.json(); 
            return data;
        } catch(err) {
            console.log('error:' + err + err.status);
        }
}

module.exports = getOneListing;