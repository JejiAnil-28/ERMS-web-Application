import { Box, Grid } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";

import ThemeSettings from "../../components/settings/ThemeSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AboutCard from "../../components/settings/AboutCard";

function SettingsPage() {

    return (

        <Box>

            <PageHeader
                title="Settings"
            />

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <ThemeSettings />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <NotificationSettings />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <SecuritySettings />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >

                    <AboutCard />

                </Grid>

            </Grid>

        </Box>

    );

}

export default SettingsPage;