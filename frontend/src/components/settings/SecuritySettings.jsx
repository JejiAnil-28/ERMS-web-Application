import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Typography,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Stack
} from "@mui/material";

function SecuritySettings() {

    const [sessionTimeout, setSessionTimeout] = useState(30);
    const [rememberMe, setRememberMe] = useState(true);
    const [autoLogout, setAutoLogout] = useState(false);

    useEffect(() => {

        const savedSettings = localStorage.getItem("securitySettings");

        if (savedSettings) {

            const settings = JSON.parse(savedSettings);

            setSessionTimeout(settings.sessionTimeout);
            setRememberMe(settings.rememberMe);
            setAutoLogout(settings.autoLogout);

        }

    }, []);

    const saveSettings = (updatedSettings) => {

        localStorage.setItem(
            "securitySettings",
            JSON.stringify(updatedSettings)
        );

    };

    const handleSessionChange = (event) => {

        const value = event.target.value;

        setSessionTimeout(value);

        saveSettings({
            sessionTimeout: value,
            rememberMe,
            autoLogout
        });

    };

    const handleRememberMe = (event) => {

        const checked = event.target.checked;

        setRememberMe(checked);

        saveSettings({
            sessionTimeout,
            rememberMe: checked,
            autoLogout
        });

    };

    const handleAutoLogout = (event) => {

        const checked = event.target.checked;

        setAutoLogout(checked);

        saveSettings({
            sessionTimeout,
            rememberMe,
            autoLogout: checked
        });

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
                    Security Settings
                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormControl
                    fullWidth
                    size="small"
                >

                    <InputLabel>
                        Session Timeout
                    </InputLabel>

                    <Select
                        value={sessionTimeout}
                        label="Session Timeout"
                        onChange={handleSessionChange}
                    >

                        <MenuItem value={15}>
                            15 Minutes
                        </MenuItem>

                        <MenuItem value={30}>
                            30 Minutes
                        </MenuItem>

                        <MenuItem value={60}>
                            60 Minutes
                        </MenuItem>

                    </Select>

                </FormControl>

                <Stack
                    spacing={1}
                    sx={{ mt: 3 }}
                >

                    <FormControlLabel
                        control={
                            <Switch
                                checked={rememberMe}
                                onChange={handleRememberMe}
                            />
                        }
                        label="Remember Me"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoLogout}
                                onChange={handleAutoLogout}
                            />
                        }
                        label="Auto Logout"
                    />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Last Login
                </Typography>

                <Typography fontWeight={600}>
                    21 July 2026, 05:30 PM
                </Typography>

            </CardContent>

        </Card>

    );

}

export default SecuritySettings;