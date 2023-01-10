import { useSelector } from "react-redux"
import Navbar from "../navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";

import ProfileHome from "./ProfileHome";
import Main from "./Main";
import FriendList from "./FriendList";

const getBreakPoint = (isTablet, isMobile) => {

    let [leftBP, midBP, rightBP] = [0, 0, 0];

    if (!isTablet && !isMobile) {
        leftBP = 3
        midBP = 6
        rightBP = 3
    }

    if (isTablet && !isMobile) {
        leftBP = 0
        midBP = 8
        rightBP = 4
    }

    if (isTablet && isMobile) {
        leftBP = 0
        midBP = 12
        rightBP = 0
    }

    return [leftBP, midBP, rightBP]
}

const HomePage = () => {

    const [isLoading, setIsLoading] = useState(true)

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const isTablet = !useMediaQuery("(min-width: 1200px)");
    const isMobile = !useMediaQuery("(min-width: 900px)");

    useEffect(() => {

        if (!user) {
            navigate('/login')
        }
        setIsLoading(false)

    }, [user, navigate])

    const [profileHomeBP, mainBP, FriendListBP] = getBreakPoint(isTablet, isMobile);
    
    return (
        <div>
            {
                isLoading ?
                    <Grid container minHeight='100vh' justifyContent='center' alignItems='center'>
                        <CircularProgress />
                    </Grid> :

                    <>
                        <Navbar />
                        <Grid container sx={{ marginTop: '80px' }}>
                            <ProfileHome user={user} breakPoint={profileHomeBP} />
                            <Main breakPoint={mainBP} />
                            <FriendList breakPoint={FriendListBP} />
                        </Grid>
                    </>
            }
        </div>
    )
}

export default HomePage