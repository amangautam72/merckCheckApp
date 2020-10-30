

const SERVER_ADDRESS = "https://checkapp.merckmiddleast.com/api/"

export const loginRequest = (username,password) => {
    var params = {
        email: username,
        password: password,
        device_type:'ios'
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("PARAMS  : " + JSON.stringify(formBody))

    return fetch(SERVER_ADDRESS+"login", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const RegisterRequest = (fname,lname,hospital,city, telephone,email,speciality) => {
    var params = {
        fname: fname,
        lname: lname,
        country: 'Saudi Arabia',
        email: email,
        city: city,
        hospital: hospital,
        specility: speciality,
        phone_number: telephone,
        device_type: 'ios'
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(SERVER_ADDRESS+"register", {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody

    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}


export const calculator = (authKey,userid,age,gender,height,weight,ft_level,suspected) => {

    let params = {
        user_id: parseInt(userid),
        login_token: authKey,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        ft_level: ft_level,
        suspected: suspected
    }

    var formData = new FormData();
    
    for (var k in params) {
        formData.append(k, params[k]);
    }
  


    return fetch(SERVER_ADDRESS+"calculator", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
        body: formData
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}


export const callApi = (url, authKey, caseId) => {


    let params = {}
    if(caseId !=null){
        params = {
            login_token: authKey,
            caseid: caseId
        }
    }else{
        params = {
            login_token: authKey,
        }
    }
    

    var formData = new FormData();
    
    for (var k in params) {
        formData.append(k, params[k]);
    }
  
    console.log("PARAMS :  " + JSON.stringify(formData))

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
          },
        // body: JSON.stringify({
        //     login_token: authKey,
        //   }),
        body: formData  
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const forgotPassword = (email) => {

    return fetch(SERVER_ADDRESS+'forgot', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data'
          },
        body: JSON.stringify({
            email: email,
          }),
        // body: formData
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const speciality = () => {

    return fetch(SERVER_ADDRESS+'speciality', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data'
          },
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}


export const calDisclaimer = (url, authKey,userid) => {
    var params = {
        login_token: authKey,
       
    }

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");


    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'multipart/form-data'
          },
        body: formBody
    }).then((response) => response.json())
    
        .catch((error) => {
            console.error(error);
        });
}

export const appDisclaimer = (url) => {

    return fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
          },
        // body: JSON.stringify({
        //     login_token: authKey,
        //   }),
    }).then((response) => response.text())
    
        .catch((error) => {
            console.error(error);
        });
}


