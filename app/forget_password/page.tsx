"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useActionState } from "react";

const page = () => {
  const [] = useActionState();
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "80%",
        marginX: "auto",
        marginTop: "5rem",
      }}
    >
      <Typography
        sx={{ textAlign: "center", marginBottom: "3rem" }}
        variant="h5"
      >
        فراموشی رمز عبور
      </Typography>
      <TextField variant="standard" name="email" />
      <Button variant="contained">ارسال ایمیل بازیابی</Button>
    </Box>
  );
};

export default page;
