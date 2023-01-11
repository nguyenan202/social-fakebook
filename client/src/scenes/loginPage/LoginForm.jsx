import { Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/store";
import { useNavigate } from "react-router-dom";


const initialValuesLogin = {
    email: "",
    password: "",
};

const LoginForn = ({ loginSchema, setPageType }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data, onSubmitProps) => {
        const loggedInResponse = await fetch(`${process.env.REACT_APP_HOST_NAME}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const loggedIn = await loggedInResponse.json();
        if (loggedIn.msg === 'Invalid password.')
            onSubmitProps.setFieldError('password', loggedIn.msg);
        else if (loggedIn.msg === 'User does not exist.')
            onSubmitProps.setFieldError('email', loggedIn.msg);
        else {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate('/');
        }
    }

    const formik = useFormik({
        initialValues: initialValuesLogin,
        validationSchema: loginSchema,
        onSubmit: async (values, onSubmitProps) => {
            await login(values, onSubmitProps)
        }
    })



    return (
        <>
            <Grid container justifyContent='center'>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                >
                    Login
                </Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid container margin='16px 0'>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type='email'
                        name='email'
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid container margin='16px 0'>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type='password'
                        name='password'
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid container margin='40px 0' flex justifyContent='center'>
                    <Button type="submit" variant="contained" style={{ width: '50%' }}>Login</Button>
                </Grid>
                <Grid container>
                    <Typography
                        style={{
                            cursor: 'pointer'
                        }}
                        color='primary'
                        sx={{
                            '&:hover': {
                                opacity: 0.9
                            }
                        }}
                        onClick={() => setPageType('register')}
                    >
                        Don't have an account? Register here.
                    </Typography>
                </Grid>
            </form>
        </>
    )
}

export default LoginForn