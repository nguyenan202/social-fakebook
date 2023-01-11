import { useTheme } from "@emotion/react";
import { Avatar, Grid, Typography } from "@mui/material";
import Moment from "react-moment";
import { useSelector } from "react-redux";


const Comment = ({ userId, fullName, userPicturePath, createdAt, comment}) => {

    const firstName = fullName.split(' ')[fullName.split(' ').length-1];

    const mode = useSelector(state => state.mode);

    const theme = useTheme();
    const inputBackgroundColor = theme.palette.neutral.light;
    const inputColor = mode === 'dark' ? '#fff' : '#000';
    const dateColor = theme.palette.neutral.mediumMain;

    const handleProfile = () => {
        console.log(userId);
    }

    return (
        <Grid container marginTop='1rem'>
            <Avatar
                src={`${process.env.REACT_APP_HOST_NAME}/images/${userPicturePath}`}
                alt={firstName}
                sx={{ width: '36px', height: '36px', cursor: 'pointer' }}
                onClick={handleProfile}    
            />
            <Grid
                item
                style={{
                    width: "auto",
                    height: 'auto',
                    backgroundColor: inputBackgroundColor,
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                    marginLeft: '1rem',
                    outline: 'none',
                    border: 'none',
                    color: inputColor,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 500,
                            cursor: 'pointer',
                            width: 'fit-content',
                            '&:hover': {
                                opacity: 0.9
                            }
                        }}
                        onClick={handleProfile}
                    >
                        {fullName}
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: '0.75rem',
                            fontSize: '0.7rem',
                            color: dateColor
                        }}
                    >
                        <Moment fromNow>{createdAt}</Moment>
                    </Typography>
                </div>
                <Typography>
                    {comment}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Comment