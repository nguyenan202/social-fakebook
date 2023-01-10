import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import Form from './Form';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    useEffect(() => {

        if (user) {
            navigate('/')
        }

    }, [user,navigate])

    return (
        <Box paddingBottom='20px'>
            <Box padding="1rem 6%" backgroundColor={alt} textAlign='center' p='1rem 6%' >
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                    sx={{
                        '&:hover': {
                            opacity: 0.8,
                            cursor: 'pointer'
                        }
                    }}
                >
                    Fakebook
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "90%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color='primary' textAlign='center'>
                    Welcome to Fakebook, the Social Media for Sociopaths!
                </Typography>
                <Form/>
            </Box>
        </Box>
    )
}

export default LoginPage