import { useContext } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { AuthContext } from "../contexts/auth-context";
import { auth, ENABLE_AUTH } from "../lib/auth";
import { useDispatch } from "react-redux";
import { resetUser } from "src/store/reducers/userSlice";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, user, ...other } = props;
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    if (!ENABLE_AUTH) {
      return;
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      await auth.signOut();

      // Update Auth Context state
      authContext.signOut();
      dispatch(resetUser());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = () => {
    Router.push({
      pathname: "/login",
      query: Router.asPath !== "/" ? { continueUrl: Router.asPath } : undefined,
    }).catch(console.error);
  };

  const handleSignUp = () => {
    Router.push({
      pathname: "/register",
      query: Router.asPath !== "/" ? { continueUrl: Router.asPath } : undefined,
    }).catch(console.error);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user.firstName + " " + user.lastName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        {Object.values(authContext.user ? authContext.user : {}).length ? (
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        ) : (
          Object.entries({ "Sign Up": handleSignUp, "Sign In": handleSignIn }).map(
            ([key, value]) => {
              return (
                <MenuItem key={key} onClick={value}>
                  {key}
                </MenuItem>
              );
            }
          )
        )}
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
