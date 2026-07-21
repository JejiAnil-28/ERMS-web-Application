import {
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Chip,
    Avatar
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function AboutCard() {

    return (

        <Card
            elevation={3}
            sx={{ borderRadius: 3 }}
        >

            <CardContent>

                <Stack
                    spacing={2}
                    alignItems="center"
                >

                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            bgcolor: "primary.main"
                        }}
                    >
                        <BusinessCenterIcon fontSize="large" />
                    </Avatar>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        ERMS
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Employee Resource Management System
                    </Typography>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body2">
                    <strong>Version:</strong> 1.0.0
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Developed By:</strong> Jeji Anil
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Frontend:</strong> React 19 + Material UI 7
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Backend:</strong> Spring Boot
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Database:</strong> MySQL
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                >

                    <Chip label="React" color="primary" />

                    <Chip label="Spring Boot" color="success" />

                    <Chip label="MySQL" color="warning" />

                    <Chip label="JWT" color="secondary" />

                    <Chip label="REST API" />

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                >
                    © 2026 Jeji Anil
                </Typography>

            </CardContent>

        </Card>

    );

}

export default AboutCard;