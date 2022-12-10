import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const Budget = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            PROFIT {`${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
          </Typography>
          <Typography color="textPrimary" variant="h4">
            ${props.budget}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <MonetizationOnIcon color="error" />
        <Typography
          color="textSecondary"
          sx={{
            ml: 1,
          }}
          variant="body2"
        >
          Received this month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
