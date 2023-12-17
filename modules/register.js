const registerUser = async function (userData) {

    const url = 'https://api.noroff.dev/api/v1/auction/auth/register';
    
    returnObj = {
        "success": false,
        "error": null
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        statusCode = res.status;
        
        if (statusCode === 201) {
            returnObj.success = true;
        } else {
            returnObj.error = data.errors[0].message;
            console.log('error: ' + JSON.stringify(data));
        }
    }
    catch (err) {
        console.log('error: ' + err + err.status);
        returnObj.error = JSON.stringify(err);
    }

    return returnObj;
};

module.exports = registerUser;