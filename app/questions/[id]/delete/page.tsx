"use client";
import { DeleteQuestionAction } from "@/app/actions/Question";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useActionState } from "react";

const page = () => {
  const params = useParams();
  const [_state, action, loading] = useActionState(DeleteQuestionAction, null);
  return (
    <Box
      sx={{
        width: "90%",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography sx={{ textAlign: "center", width: "100%" }}>
        Are you sure you want to delete this question?
      </Typography>
      <Box
        sx={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "6rem",
        }}
      >
        <Box component="form" action={() => redirect(`/questions/`)}>
          <Button type="submit" variant="contained" color="primary">
            No
          </Button>
        </Box>
        <Box component="form" action={action}>
          <input type="hidden" name="id" value={params?.id} />
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="error"
          >
            Yes
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
