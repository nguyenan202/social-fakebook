import { Avatar, Grid, Typography, useTheme } from "@mui/material"
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from '@mui/icons-material';


const ProfileHome = ({ user, breakPoint }) => {

    const theme = useTheme();

    const background = theme.palette.background.alt;

    return (breakPoint !== 0 ?
        (<Grid item xs={breakPoint} padding='2rem 1rem 2rem 4rem'>
            <Grid container style={{ backgroundColor: background }} borderRadius='8px' padding='1rem'>

                <Grid item xs={12} display='flex' borderBottom='1px solid #3E4042' paddingBottom='1rem'>
                    <Avatar src={`http://localhost:8080/images/${user.picturePath}`} alt={user.firstName} />
                    <Grid container marginLeft='1rem'>
                        <Grid item xs={12}>
                            <Typography fontSize='14px' fontWeight='medium'>
                                {`${user.lastName} ${user.firstName}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontSize='12px' color='#ccc'>
                                {user.friends.length} friends
                            </Typography>
                        </Grid>
                    </Grid>
                    <ManageAccountsOutlined />
                </Grid>

                <Grid item xs={12} borderBottom='1px solid #3E4042' padding='1rem 0 0.5rem 0'>
                    <Typography display='flex' alignItems='center' marginBottom='0.5rem'>
                        <LocationOnOutlined style={{ marginRight: '0.5rem' }} />
                        {user.location}
                    </Typography>
                    <Typography display='flex' alignItems='center' marginBottom='0.5rem'>
                        <WorkOutlineOutlined style={{ marginRight: '0.5rem' }} />
                        {user.occupation}
                    </Typography>
                </Grid>

                <Grid item xs={12} borderBottom='1px solid #3E4042' padding='1rem 0 0.5rem 0'>
                    <Grid container>
                        <Grid item display='flex' justifyContent='space-between' alignItems='center' width='100%' marginBottom='0.5rem' color='#ccc'>
                            <Typography>
                                Who's viewed your profile
                            </Typography>
                            <Typography>
                                {user.viewedProfile}
                            </Typography>
                        </Grid>
                        <Grid item display='flex' justifyContent='space-between' alignItems='center' width='100%' marginBottom='0.5rem' color='#ccc'>
                            <Typography>
                                Total post likes
                            </Typography>
                            <Typography>
                                {user.impressions}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} padding='1rem 0 0.5rem 0'>
                    <Typography component={'div'} display='flex' alignItems='center' marginBottom='0.5rem'>
                        <img src='/assets/images/linkedin.png' alt='linkedin_logo' />
                        <Grid container marginLeft='1rem'>
                            <Grid item xs={12}>
                                <Typography fontSize='12px' fontWeight='medium'>
                                    Linkedin
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography fontSize='10px' color='#ccc'>
                                    Social Network
                                </Typography>
                            </Grid>
                        </Grid>
                        <EditOutlined />
                    </Typography>
                    <Typography component={'div'} display='flex' alignItems='center' marginBottom='0.5rem'>
                        <img src='/assets/images/twitter.png' alt='twitter_logo' />
                        <Grid container marginLeft='1rem'>
                            <Grid item xs={12}>
                                <Typography fontSize='12px' fontWeight='medium'>
                                    Twitter
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography fontSize='10px' color='#ccc'>
                                    Network Platform
                                </Typography>
                            </Grid>
                        </Grid>
                        <EditOutlined />
                    </Typography>
                </Grid>
            </Grid>
        </Grid>) : <></>
    )
}

export default ProfileHome