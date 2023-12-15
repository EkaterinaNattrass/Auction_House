const getListings = async function () {

    const url = 'https://api.noroff.dev/api/v1/auction/listings?_active=true';

    const options = {
        method: 'GET'
    };

    try {
        const res = await fetch (url, options);
        const listings = await res.json();
        return listings;
    } catch(err) {
        console.log(err + err.status);
        return false;
    }
};

module.exports = getListings;