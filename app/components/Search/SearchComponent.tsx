import { Box, Button, TextField } from "@mui/material";
import { redirect } from "next/navigation";
import { SearchListView } from "./SearchListView";
import { Suspense } from "react";
import { LoadingQuestion } from "../Question/LoadingQuestion";

const SearchComponent = async ({ query }: { query: string }) => {
  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginX: "auto",
        marginTop: "3rem",
      }}
    >
      <Box
        component="form"
        action={async (formData: FormData) => {
          "use server";
          const query = encodeURI(formData.get("query")?.toString()!);
          redirect(`/search?q=${query}`);
        }}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField name="query" variant="standard" defaultValue={query} />
        <Button type="submit" variant="contained">
          جستجو
        </Button>
      </Box>
      <Suspense fallback={<LoadingQuestion />}>
        <SearchListView query={query} />
      </Suspense>
    </Box>
  );
};
export { SearchComponent };
