import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import {Avatar, FormLayout, TextField, Button} from '@shopify/polaris';
import ReCAPTCHA from 'react-grecaptcha'
import UserAPI from "../../api/userApi";
import {useHistory} from "react-router-dom"
import GoogleMap from "../GoogleMap";


const Login = (props) => {
    const history = useHistory()

    const [data, setData] = useState({});
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [errorExistAcc, setErrorExistAcc] = useState(false)

    const handleOnChange = (value,id) => {
        setData({...data,[id]: value});

    }
    useEffect(() => {
        const fetchListUser = async() => {
            const newListUsers = await UserAPI.getAllUser();
            setListUsers(newListUsers)
        }
        fetchListUser()
    },[])
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
    // function submit
    const handleSubmit = async(data) => {
        setLoadingBtn(true)
        if(listUsers.data.find(item => item.email === data.email )){
            setErrorExistAcc(true);
            await setLoadingBtn(false)

        }else {
            if(data.name && data.address && data.email && data.phone ){
                await UserAPI.postUser(data);
                await setLoadingBtn(false)
                await history.push("/home");
            }
            else{
                setLoadingBtn(false)
            }
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
                        sitekey="6LeTci8UAAAAAAZV-D4OGD9x7VJvBUQ8QJDT9N4X"
                        callback={(value) => console.log(value)}
                        expiredCallback={() => console.log("expried callback")}
                        locale="en"
                    />
                    
                    <Button primary loading={loadingBtn} type="submit" onClick={() => handleSubmit(data)}>Submit</Button>
                    {errorExistAcc && <p>Email existed! Let's enter another email to sign in!</p>}
                </FormLayout>
            </div>
        </div>
    )
}
export default Login