import { Grid, Paper, Typography } from "@mui/material";

function PayrollStatistics({ payrolls }) {

    const totalPayrolls = payrolls.length;

    const paidPayrolls = payrolls.filter(
        payroll => payroll.status === "PAID"
    ).length;

    const pendingPayrolls = payrolls.filter(
        payroll => payroll.status === "PENDING"
    ).length;

    const totalAmount = payrolls.reduce(

        (sum, payroll) =>

            sum + Number(payroll.netSalary || 0),

        0

    );

    const statistics = [

        {
            title: "Total Payrolls",
            value: totalPayrolls,
            color: "#1976d2"
        },

        {
            title: "Paid Payrolls",
            value: paidPayrolls,
            color: "#2e7d32"
        },

        {
            title: "Pending Payrolls",
            value: pendingPayrolls,
            color: "#ed6c02"
        },

        {
            title: "Total Amount",
            value: `₹ ${totalAmount.toLocaleString("en-IN")}`,
            color: "#9c27b0"
        }

    ];

    return (

        <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
        >

            {statistics.map((item) => (

                <Grid
                    key={item.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >

                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            borderLeft: `5px solid ${item.color}`
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.title}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ color: item.color }}
                        >
                            {item.value}
                        </Typography>

                    </Paper>

                </Grid>

            ))}

        </Grid>

    );

}

export default PayrollStatistics;
