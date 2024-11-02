import { Box, Button, Link, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "80%",
        marginX: "auto",
        marginTop: "6rem",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
        Unauthorized
      </Typography>
      <Button component={Link} href="/signin" variant="contained">
        Signin
      </Button>
    </Box>
  );
};
export { Unauthorized };
