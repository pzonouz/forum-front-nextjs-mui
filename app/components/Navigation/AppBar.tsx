import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { auth } from "@/auth";
import { UserMenu } from "./UserMenu";
import { SearchBarComponent } from "./SearchBar";

const ResponsiveAppBar = async () => {
  const pages = [
    { name: "خانه", path: "/" },
    // { name: "سوالات", path: "/questions" },
  ];
  const session = await auth();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 600,
              textDecoration: "none",
              display: { xs: "none", md: "flex" },
              color: "inherit",
            }}
          >
            انجمن
          </Typography>
          <MobileMenu pages={pages} />
          <SearchBarComponent />
          <DesktopMenu pages={pages} />
          <UserMenu session={session!} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { ResponsiveAppBar };
