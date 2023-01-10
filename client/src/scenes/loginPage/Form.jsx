import { useState } from "react";
import * as yup from "yup";
import LoginForn from "./LoginForm";
import RegisterForn from "./RegisterForm";

const registerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Password not match').required('Confirm Password is required'),
    location: yup.string().required('Location is required'),
    occupation: yup.string().required('Occupation is required')
})

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

const Form = () => {

    const [pageType, setPageType] = useState("login");

    return (
        <>
            {
                pageType === 'login' ?
                <LoginForn loginSchema={loginSchema} setPageType={setPageType} /> :
                <RegisterForn registerSchema={registerSchema} setPageType={setPageType} />
            }
        </>
    )
}

export default Form