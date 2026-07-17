import {
    Box,
    Paper,
    Typography,
    TextField,
    Button
} from "@mui/material";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { login as loginService }
from "../../services/authService";

import { AuthContext }
from "../../context/AuthContext";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await loginService({

            username,

            password

        });

        auth.login(response.data.data);

        navigate("/dashboard");

    }

    catch (error) {

        alert("Invalid username or password");

        console.error(error);

    }

};

    return (

        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5"
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    width: 400
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >

                    ERMS

                </Typography>

                <Typography
                    align="center"
                    sx={{
                        mb: 3
                    }}
                >

                    Employee Resource Management System

                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3
                        }}
                    >

                        Login

                    </Button>

                </form>

            </Paper>

        </Box>

    );

}

export default Login;