import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material"
import Friend from "./Friend";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";


const FriendList = ({ breakPoint }) => {

    const theme = useTheme();
    const user = useSelector(state => state.user);

    const background = theme.palette.background.alt;

    const allFriends = user.friends.map(friend => {

        return (
            <Friend
                key={friend.userId}
                userId={friend.userId}
                fullName={`${friend.lastName} ${friend.firstName}`}
                picturePath={friend.picturePath}
            />
        )
    })

    return (
        breakPoint !== 0 ?
            (<Grid item xs={breakPoint} padding='2rem 4rem 2rem 1rem'>

                <Grid container sx={{ backgroundColor: background, height: 'calc(100vh - 80px - 4rem)', overflow: 'hidden' }} borderRadius='8px' padding='1rem'>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #3E4042' }}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                width: 'fit-content',
                                fontSize: '1.5rem'
                            }}
                        >
                            Friends
                        </Typography>
                    </Grid>

                    <Scrollbars
                        autoHide
                        universal
                    >
                        {allFriends}

                    </Scrollbars>
                </Grid>
            </Grid>) : <></>
    )
}

export default FriendList