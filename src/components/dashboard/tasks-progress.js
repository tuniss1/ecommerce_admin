import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const TasksProgress = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            TOTAL ORDERS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {props.count} orders
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <AssignmentIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
