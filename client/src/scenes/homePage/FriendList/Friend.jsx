import { Avatar, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


const Friend = ({ userId, fullName, picturePath, }) => {

    const navigate = useNavigate();

    const handleNavigateProfile = () => {
        navigate(`/profile/${userId}`);
    }

    return (
        <Grid
            item
            xs={12}
            sx={{
                padding: '0.5rem 0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                    backgroundColor: '#333',
                    cursor: 'pointer'
                }
            }}
            onClick={handleNavigateProfile}
        >
            <Avatar src={`http://localhost:8080/images/${picturePath}`} alt={fullName} />

            <Typography
                sx={{
                    fontWeight: 500,
                    marginLeft: '0.5rem',
                    fontSize: '1rem'
                }}
            >
                {fullName}
            </Typography>
        </Grid>
    )
}

export default Friend