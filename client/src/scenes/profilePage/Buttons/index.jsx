import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";


const ProfileButton = ({ bgColor, icon, name, customMargin, onClick, ...props }) => {


    return (
        <Box display='flex' alignItems='center'>
            <Button
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: bgColor,
                    padding: '0.5rem 1rem',
                    margin: '0 1rem 0 0.5rem',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: bgColor,
                        opacity: 0.8
                    }
                }}
                onClick={onClick}
                {...props}
            >
                {icon}
                <Typography
                    sx={{
                        margin: customMargin 
                    }}
                >
                    {name}
                </Typography>
            </Button>
        </Box>
    )
}

export default ProfileButton;