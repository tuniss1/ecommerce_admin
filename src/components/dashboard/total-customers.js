import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const TotalCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            NO. ORDER {`${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {props.count} orders
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <AssignmentIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      >
        <PlaylistAddIcon color="success" />
        <Typography
          color="textSecondary"
          variant="body2"
          sx={{
            ml: 1,
          }}
        >
          Received since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
