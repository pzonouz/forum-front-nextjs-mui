"use server";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { auth } from "@/auth";
import { UserMenu } from "./UserMenu";

const ResponsiveAppBar = async () => {
  const pages = ["Questions", "Tags", "Blog"];
  const session = await auth();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FORUM
          </Typography>
          <MobileMenu pages={pages} />

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FORUM
          </Typography>
          <DesktopMenu pages={pages} />
          <UserMenu session={session!} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { ResponsiveAppBar };
