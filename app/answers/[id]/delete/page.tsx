"use client";
import { DeleteAnswerAction } from "@/app/actions/Answer";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useActionState } from "react";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const [_state, action, loading] = useActionState(DeleteAnswerAction, null);
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
      <Typography
        variant="h6"
        sx={{
          fontSize: "1rem",
          fontWeight: "500",
          textAlign: "center",
          width: "100%",
        }}
      >
        آیا از حذف پاسخ اطمینان دارید؟
      </Typography>
      <Box
        sx={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "6rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.back()}
        >
          نه
        </Button>
        <Box component="form" action={action}>
          <input type="hidden" name="id" value={params?.id} />
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="error"
          >
            بله
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default page;
