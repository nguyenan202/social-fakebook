import { Box } from "@mui/material"
import Navbar from "../navbar"
import HeaderProfile from './HeaderProfile'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const ProfilePage = () => {

    const { userId } = useParams();
    
    const token = useSelector(state => state.token);
    const [user, setUser] = useState();

    useEffect(() => {

        const getUser = async () => {
            const response = fetch(`http://localhost:8080/users/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            const userResp = await (await response).json();

            setUser(userResp);
        }

        getUser();

    }, [userId, token])

    return (
        <Box
            marginTop='80px'
        >
            <Navbar />
            {user && user._id === userId && <HeaderProfile user={user} setUser={setUser} />}
        </Box>
    )
}

export default React.memo(ProfilePage)