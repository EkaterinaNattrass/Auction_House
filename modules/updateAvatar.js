const updateAvatar = async function(avatar, userName, token) {

    const url = 'https://api.noroff.dev/api/v1/auction/profiles/' + userName + '/media';

    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify(avatar) 
    };

    try {
        const res = await fetch(url, options);
        const updatedAvatar = await res.json();
        statusCode = res.status;
        console.log(updatedAvatar);
        return statusCode === 200;
    }
    catch (err) {
        return false
    }
    
};

module.exports = updateAvatar;