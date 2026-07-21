import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Typography,
    Divider,
    FormGroup,
    FormControlLabel,
    Switch
} from "@mui/material";

function NotificationSettings() {

    const [settings, setSettings] = useState({

        email: true,

        leave: true,

        payroll: true,

        attendance: true

    });

    useEffect(() => {

        const savedSettings =
            localStorage.getItem("notificationSettings");

        if (savedSettings) {

            setSettings(JSON.parse(savedSettings));

        }

    }, []);

    const handleChange = (event) => {

        const updatedSettings = {

            ...settings,

            [event.target.name]: event.target.checked

        };

        setSettings(updatedSettings);

        localStorage.setItem(
            "notificationSettings",
            JSON.stringify(updatedSettings)
        );

    };

    return (

        <Card
            elevation={3}
            sx={{ borderRadius: 3 }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    Notification Settings

                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormGroup>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.email}
                                onChange={handleChange}
                                name="email"
                            />
                        }
                        label="Email Notifications"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.leave}
                                onChange={handleChange}
                                name="leave"
                            />
                        }
                        label="Leave Approval Notifications"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.payroll}
                                onChange={handleChange}
                                name="payroll"
                            />
                        }
                        label="Payroll Notifications"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.attendance}
                                onChange={handleChange}
                                name="attendance"
                            />
                        }
                        label="Attendance Reminders"
                    />

                </FormGroup>

            </CardContent>

        </Card>

    );

}

export default NotificationSettings;