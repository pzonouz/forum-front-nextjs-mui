"use client";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserMenu = ({ session }: { session: Session }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={session?.user?.firstName!} src={session?.user?.image!} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {session?.user && (
          <Typography
            sx={{
              backgroundColor: "#eeeeee",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            {session?.user?.firstName}
          </Typography>
        )}
        {session?.user && (
          <MenuItem key={1} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Profile</Typography>
          </MenuItem>
        )}
        {session?.user && (
          <MenuItem
            key={4}
            onClick={() => {
              signOut({ redirectTo: "/signin" });
            }}
          >
            <Typography sx={{ textAlign: "center" }}>Signout</Typography>
          </MenuItem>
        )}
        {!session?.user && (
          <MenuItem
            component={Link}
            href="/signin"
            key={2}
            onClick={handleCloseUserMenu}
          >
            <Typography sx={{ textAlign: "center" }}>Sign In</Typography>
          </MenuItem>
        )}

        {!session?.user && (
          <MenuItem key={3} component={Link} href="/signup">
            <Typography sx={{ textAlign: "center" }}>Sign Up</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
export { UserMenu };
