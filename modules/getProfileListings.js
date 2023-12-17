const getProfileListings = async function (userName, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/profiles/' + userName + '?_listings=true';
    const bearerToken = 'Bearer ' + token ;

    const options = {
        method: 'GET',
        headers: {  
            'Content-Type': 'application/json',
            Authorization: bearerToken,
            },
    };
    
    try {
        const res = await fetch(url, options);
        const profileListings = await res.json();
        console.log(profileListings);
        return profileListings;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = getProfileListings;