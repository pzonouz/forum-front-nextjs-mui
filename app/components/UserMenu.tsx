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
  console.log(session);
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
          <MenuItem key={1} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Profile</Typography>
          </MenuItem>
        )}
        {!session?.user && (
          <MenuItem
            LinkComponent={Link}
            href="/signin"
            key={2}
            onClick={handleCloseUserMenu}
          >
            <Typography sx={{ textAlign: "center" }}>Sign In</Typography>
          </MenuItem>
        )}

        {!session?.user && (
          <MenuItem key={3} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>Sign Up</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
export { UserMenu };
