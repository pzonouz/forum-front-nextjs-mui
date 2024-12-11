import { Box, Skeleton } from "@mui/material";

const LoadingQuestion = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
      <Skeleton
        animation="pulse"
        variant="rounded"
        width={"100%"}
        height={70}
      />
    </Box>
  );
};
export { LoadingQuestion };
