import {
    Card,
    CardContent,
    Typography,
    Divider,
    FormControlLabel,
    Switch,
    RadioGroup,
    Radio
} from "@mui/material";

import { useEffect, useState } from "react";

function ThemeSettings() {

    const [darkMode, setDarkMode] = useState(false);
    const [primaryColor, setPrimaryColor] = useState("blue");

    useEffect(() => {

        const theme = localStorage.getItem("darkMode");
        const color = localStorage.getItem("primaryColor");

        if (theme !== null) {
            setDarkMode(theme === "true");
        }

        if (color) {
            setPrimaryColor(color);
        }

    }, []);

    const handleDarkMode = (event) => {

        const checked = event.target.checked;

        setDarkMode(checked);

        localStorage.setItem("darkMode", checked);

    };

    const handleColor = (event) => {

        const value = event.target.value;

        setPrimaryColor(value);

        localStorage.setItem("primaryColor", value);

    };

    return (

        <Card elevation={3} sx={{ borderRadius: 3 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Theme Settings
                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={handleDarkMode}
                        />
                    }
                    label="Dark Mode"
                />

                <Typography
                    sx={{ mt: 3, mb: 1 }}
                    fontWeight={600}
                >
                    Primary Color
                </Typography>

                <RadioGroup
                    value={primaryColor}
                    onChange={handleColor}
                >
                    <FormControlLabel
                        value="blue"
                        control={<Radio />}
                        label="Blue"
                    />

                    <FormControlLabel
                        value="green"
                        control={<Radio />}
                        label="Green"
                    />

                    <FormControlLabel
                        value="purple"
                        control={<Radio />}
                        label="Purple"
                    />
                </RadioGroup>

            </CardContent>

        </Card>

    );

}

export default ThemeSettings;