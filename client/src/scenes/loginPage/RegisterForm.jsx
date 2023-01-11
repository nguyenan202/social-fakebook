import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import { useFormik } from "formik";


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    location: "",
    occupation: "",
    picturePath: "no_image.png",
};

const RegisterForn = ({ registerSchema, setPageType }) => {

    const register = async (data, onSubmitProps) => {
        const newData = { ...data }
        delete newData['rePassword'];

        const loggedInResponse = await fetch(`${process.env.REACT_APP_HOST_NAME}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        const registered = await loggedInResponse.json();

        if (!registered._id) {
            onSubmitProps.setFieldError('email', 'Email is already in use')
        } else {
            onSubmitProps.resetForm();
            setPageType('login')
        }
    }

    const formik = useFormik({
        initialValues: initialValuesRegister,
        validationSchema: registerSchema,
        onSubmit: async (values, onSubmitProps) => {
            await register(values, onSubmitProps)
        }
    })

    const isNonMobile = useMediaQuery("(min-width:600px)");


    return (
        <>
            <Grid container justifyContent='center'>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                >
                    Register
                </Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={isNonMobile ? 6 : 12} margin='16px 0'>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            name='firstName'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={isNonMobile ? 6 : 12} margin='16px 0' paddingTop={!isNonMobile && '0!important'}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            name='lastName'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} margin='16px 0'>
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
                </Grid>
                <Grid container>
                    <Grid item xs={12} margin='16px 0'>
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
                </Grid>
                <Grid container>
                    <Grid item xs={12} margin='16px 0'>
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type='password'
                            name='rePassword'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                            helperText={formik.touched.rePassword && formik.errors.rePassword}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} margin='16px 0'>
                        <TextField
                            label="Location"
                            variant="outlined"
                            name='location'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} margin='16px 0'>
                        <TextField
                            label="Occupation"
                            variant="outlined"
                            name='occupation'
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.occupation}
                            error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                            helperText={formik.touched.occupation && formik.errors.occupation}
                        />
                    </Grid>
                </Grid>
                <Grid container margin='40px 0' flex justifyContent='center'>
                    <Button type="submit" variant="contained" style={{ width: '50%' }}>Sign Up</Button>
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
                        onClick={() => setPageType('login')}
                    >
                        Already have an account? Login here.
                    </Typography>
                </Grid>
            </form>
        </>
    )
}

export default RegisterForn