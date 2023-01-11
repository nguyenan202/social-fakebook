import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/store";


const FriendRequest = ({ userId, fullName, picturePath }) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state);

    const greyButton = theme.palette.neutral.mediump;
    const primaryButtom = theme.palette.primary.main;

    const handleAccept = async () => {

        const response = fetch(`${process.env.REACT_APP_HOST_NAME}/users/friend-request/accept/${user._id}/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const msg = await (await response).json();

        if (msg.message === 'success') {
            dispatch(setUser({ user: msg.user }));
        }
    }

    const handleRefuse = async () => {

        const response = fetch(`${process.env.REACT_APP_HOST_NAME}/users/friend-request/refuse/${user._id}/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const msg = await (await response).json();

        if (msg.message === 'success') {
            dispatch(setUser({ user: msg.user }));
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem 0',
                '&:hover': {
                    backgroundColor: '#454343'
                }
            }}
        >
            <Box display='flex' alignItems='center'>
                <Avatar src={`${process.env.REACT_APP_HOST_NAME}/images/${picturePath}`} alt={fullName} sx={{ width: '3rem', height: '3rem' }} />
                <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        marginLeft: '1rem'
                    }}
                >
                    {fullName}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Button
                    sx={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: primaryButtom,
                        color: '#fff',
                        margin: '0 0.5rem',
                        '&:hover': {
                            backgroundColor: primaryButtom,
                            opacity: 0.8
                        }
                    }}
                    onClick={handleAccept}
                >
                    Accept
                </Button>
                <Button
                    sx={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: greyButton,
                        color: '#fff',
                        margin: '0 0.5rem',
                        '&:hover': {
                            backgroundColor: greyButton,
                            opacity: 0.8
                        }
                    }}
                    onClick={handleRefuse}
                >
                    Refuse
                </Button>
            </Box>
        </Box>
    )
}

export default FriendRequest;