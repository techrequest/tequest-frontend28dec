import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';

const RegistrationScreen = () => {


    const [ state, setState ] = useState(
        {
            showErrors: false,
            loading: false,
            registeredSuccess: false
        }
    )

    const formData = new FormData();

    // Undefined only before return
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let phoneField;
    let addressLine1Field;
    let addressLine2Field;
    let addressLine3Field;
    let cityField;
    let stateField;
    let zipCodeField;
    let countryField;
    let tncField;
    let preferredTimeField;
    let isUnderageField;
    let photoURL;
    
    const attachFile = (event) => {
        // 1. create an array for file
        const files = Array.from(event.target.files)

        // 2. for every attachment, append file to formData
        files.forEach(
            (file, index) => {
                formData.append(index, file)
            }
        )
    }

    const registerUser = () => {
        const errors = [];
        // Validate the user's input
        if(firstNameField.value.length === 0) {
            errors.push("Please enter your first name!");
        }

        if(lastNameField.value.length === 0) {
            errors.push("Please enter your last name!");
        }

        if(emailField.value.length === 0) {
            errors.push("Please enter your email!");
        }

        if(passwordField.value.length === 0) {
            errors.push("Please enter your password!");
        }

        if(phoneField.value.length === 0){
            errors.push("Please enter your phone number! ");
        }

        if(addressLine1Field.value.length === 0){
            errors.push("Please enter your Address Line 1! ");
        }

        if(addressLine2Field.value.length === 0){
            errors.push("Please enter your Address Line 2! ");
        }

        if(cityField.value.length === 0){
            errors.push("Please enter your City! ");
        }

        if(stateField.value.length === 0){
            errors.push("Please enter your State! ");
        }

        if(countryField.value.length === 0){
            errors.push("Please enter your country! ");
        }

        if(zipCodeField.value.length === 0){
            errors.push("Please enter your Zip Code! ");
        }
        if(tncField.checked === false) {
            errors.push("You need to accept terms & conditions.");
        }
        // if(isUnderageField.checked === false) {
        //     errors.push("You need to be at least 18 yrs old to use our site.");
        // }
        

        // If there are errors
        if(errors.length > 0) {
            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    registeredSuccess: false
                }
            )
        } 
        // If no errors
        else {
            setState(
                {
                    loading: true,
                    showErrors: false,
                    errors: null,
                    registeredSuccess: false
                }
            );

            // Capture all of user's response
            // 1. Create an object called formData
            // 2. For every field, add index and value to formData

            formData.append('firstName', 'yousef');
            formData.append('lastName', lastNameField.value);
            formData.append('email', emailField.value);
            formData.append('password', passwordField.value);
            formData.append('phoneNumber', phoneField.value);
            formData.append('addressLine1', addressLine1Field.value);
            formData.append('addressLine2', addressLine2Field.value);
            formData.append('addressLine3', addressLine3Field.value);
            formData.append('city', cityField.value);
            formData.append('state', stateField.value);
            formData.append('zipCode', zipCodeField.value);
            formData.append('country', countryField.value);

 
            // formData.append('tnc', tncField.value);       ---> why is this part of the formData?
            // formData.append('preferredTime', preferredTimeField.value);
            // formData.append('isUnderage', isUnderageField.value);
           
           
            // const formData = {
            //     firstName: firstNameField.value,
            //     lastName: lastNameField.value,
            //     email: emailField.value,
            //     password: passwordField.value,
            //     phone: phoneField.value,
            //     addressLine1: addressLine1.value,
            //     addressLine2: addressLine2.value,
            //     addressLine3: addressLine3.value,
            //     city: city.value,
            //     state: state.value,
            //     zipCode: zipCode.value,
            //     country: country.value
            // };

            alert(Object.values(formData));
            console.log(Object.values(formData));



            // 4. Send to backend
            fetch(
                'http://localhost:8080/users/register',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                      // "Content-Type": "multipart/formdata"
                    }
                }
            )
            // First, convert string from backend to json
            .then(
                (backendResponse) => backendResponse.json()
            )

            // Then, we can read the json from backend
            .then(
                (json) => {
                    console.log(json);
                    setState(
                        {
                            loading: false,
                            showErrors: false,
                            errors: null,
                            registeredSuccess: true
                        }
                    );
                }
            )
            // If promise did not resolve
            .catch(
                (error) => {
                    console.log('an error occured', error)
                }
            )

        }
    }

    if( state.registeredSuccess === true ) {
        return(
            <div className="App">
                <div 
                style={{maxWidth: 600}}
                className="container mt-5 mb-5">
                    <div className="alert alert-success">
                        Account registered succesfully!
                    </div>
                    <button className="btn">
                    <Link to="/login" className="nav-link">Login</Link>
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container" style={
                {
                    maxWidth: "40em"
                }
            } >

            {
                state.showErrors === true && 
                <div className="error-messages alert alert-danger">
                    <ol>
                    { 
                        state.errors.map(
                            (error) =>
                                <li>
                                    {error}
                                </li>
                        ) 
                       
                    }
                    </ol>
                </div>
            }

            <label>Enter your firstname *</label>
            <input 
            ref={(elem) => firstNameField = elem}
            className="field form-control" name="firstName" type="text" />

            {console.log(firstNameField)}

            <label>Enter your lastname *</label>
            <input 
            ref={(elem) => lastNameField = elem}
            className="field form-control" name="lastName" type="text" />

            <label>Enter your email *</label>
            <input 
            ref={(elem) => emailField = elem}
            className="field form-control" name="email" type="text" />

            <label>Enter a password *</label>
            <input 
            ref={(elem) => passwordField = elem}
            className="field form-control" name="password" 
            autocomplete="off" type="password" />

            <label>Enter your phone (optional)</label>
            <input 
            ref={(elem) => phoneField = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your address</label>
            <input 
            ref={(elem) => addressLine1Field = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your address</label>
            <input 
            ref={(elem) => addressLine2Field = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your address (optional)</label>
            <input 
            ref={(elem) => addressLine3Field = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your city</label>
            <input 
            ref={(elem) => cityField = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your state</label>
            <input 
            ref={(elem) => stateField = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your zip code</label>
            <input 
            ref={(elem) => zipCodeField = elem}
            className="field form-control" name="phone" type="text" />

            <label>Enter your country</label>
            <input 
            ref={(elem) => countryField = elem}
            className="field form-control" name="phone" type="text" />

            <br/><br/>

            <label>Upload your profile picture</label>
            <input 
            onChange={attachFile}
            className="field form-control" id="photo" name="file" 
            type="file" multiple="multiple"/>

            <br/><br/>

            <label>Do you agree to terms &amp; conditions? *</label>
            <input 
            ref={(elem) => tncField = elem}
            className="checkbox" name="termsConditions" type="checkbox" /> Yes

            <br/><br/>



            {/* <label>Are you at least 18 years old or more *</label>
            
            <input 
            ref={(elem) => isUnderageField = elem}
            className="checkbox" name="isUnderage" type="checkbox" /> Yes

                <p>

                </p>
            <label>What is your preferred time for service  *</label>
            <input 
            ref={(elem) => preferredTimeField = elem}
            className="checkbox" name="preferredTime" type="checkbox" /> During Working Hours (9:30am to 5:00 pm)

            <p>
                
            </p> */}
            {/* <label>Upload your profile picture</label>
            <input className="field form-control" id="photo" name="file" 
            type="file" multiple="multiple"/>
            */}

            {
                !state.loading && !state.registeredSuccess && <div className="acenter">
                <button
                    className="btn btn-primary"
                    onClick={registerUser}
                    style={
                        {
                            
                            padding: "10px", 
                            fontSize: "16px"
                        }
                    }>
                       Register
                </button>
                </div> 
            }

            {
                state.loading &&
                <div>Loading...</div>
            }
            
        </div>
        )
    }
}

export default RegistrationScreen;