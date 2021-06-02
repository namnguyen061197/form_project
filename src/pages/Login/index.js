import React, { useCallback, useState } from "react";
import "./index.scss";
import {Avatar, FormLayout, TextField} from '@shopify/polaris';
import ReCAPTCHA from 'react-grecaptcha'


const Login = (props) => {
    const [data, setData] = useState({});
    const handleOnChange = (value,id) => {
        setData({...data,[id]: value});

    }
    // validate function
    const isRequired = (value) => {
        if(!value) {
            return true
        }
    }
    const isPhoneNumber = (phone) => {
        const re = /((09|03|07|08|05)+([0-9]{8})\b)/g
        return !re.test(String(phone).toLowerCase());
    }
    const isEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(email).toLowerCase());
    }

    const errorMessage = (value, validateFunc) => {
        switch (validateFunc) {
            case isRequired:
                return validateFunc(value) ? "Field is Required" : "";
            case isPhoneNumber:
                return validateFunc(value) ? "Phone is not right !" : "";
            case isEmail:
                return validateFunc(value) ? "E mail is not right !" : "";
            default:
                break;
        }
    }

    return (
        <div className="login">
            <div className="login_form">
                <div className="avatar">
                    <Avatar customer name="Avatar" />
                </div>
                <h2 style={{fontSize:"25px",fontWeight:"500"}}>SIGN UP</h2>
                <FormLayout>
                    <TextField 
                        label="Name" 
                        id="name"  
                        value={data.name}
                        error={errorMessage(data.name,isRequired)} 
                        onChange={handleOnChange} 
                    />
                    <TextField 
                        label="Address" 
                        id="address" 
                        value={data.address} 
                        onChange={handleOnChange}
                        error={errorMessage(data.address, isRequired)} 
                    />
                    <TextField 
                        label="Email" 
                        id="email" 
                        type="email"
                        value={data.email} 
                        onChange={handleOnChange}
                        error={errorMessage(data.email, isEmail)} 
                    />
                    <TextField 
                        label="Phone" 
                        id="phone"
                        type="number" 
                        type="phone"
                        value={data.phone} 
                        onChange={handleOnChange}
                        error={errorMessage(data.phone, isPhoneNumber)} 
                    />
                    <ReCAPTCHA
                        sitekey="6LeOjQkbAAAAAGnT7nHKhNCPbYxY3rKS8Cx-OE4q"
                        callback={() => console.log("callback")}
                        expiredCallback={() => console.log("expried callback")}
                        locale="en"
                    />
                </FormLayout>
            </div>
        </div>
    )
}
export default Login