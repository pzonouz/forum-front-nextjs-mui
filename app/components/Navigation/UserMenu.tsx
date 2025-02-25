"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "16rem",
            marginX: "auto",
            marginTop: "16rem",
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <Typography variant="h6" component="h2">
            آيا خارج می شوید؟
          </Typography>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                signOut({ redirectTo: "/Q&A/signin" });
              }}
              color="error"
              variant="contained"
            >
              بله
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              خیر
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={session?.user?.name!} src={session?.user?.image!} />
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
              {session?.user?.name}
            </Typography>
          )}
          {session?.user && (
            <MenuItem key={1} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }}>ناحیه کاربری</Typography>
            </MenuItem>
          )}
          {session?.user && (
            <MenuItem
              key={4}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <Typography sx={{ textAlign: "center" }}>خروج</Typography>
            </MenuItem>
          )}
          {!session?.user && (
            <MenuItem
              component={Link}
              href="/Q&A/signin"
              key={2}
              onClick={handleCloseUserMenu}
            >
              <Typography sx={{ textAlign: "center" }}>ورود</Typography>
            </MenuItem>
          )}

          {!session?.user && (
            <MenuItem key={3} component={Link} href="/Q&A/signup">
              <Typography sx={{ textAlign: "center" }}>ثبت نام</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
};
export { UserMenu };
