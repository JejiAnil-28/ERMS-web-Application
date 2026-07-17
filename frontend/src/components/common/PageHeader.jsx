import { Box, Typography, Button } from "@mui/material";

function PageHeader({
    title,
    buttonText,
    buttonIcon,
    onButtonClick
}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}
        >

            <Typography variant="h4">

                {title}

            </Typography>

            {buttonText && (

                <Button
                    variant="contained"
                    startIcon={buttonIcon}
                    onClick={onButtonClick}
                >

                    {buttonText}

                </Button>

            )}

        </Box>

    );

}

export default PageHeader;