import { AnswerType } from "@/app/types/AnswerTypes";
import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const FileSearchListView = async ({ query }: { query: string }) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/search/files?query=${query}`,
  );
  const files = await res.json();
  if (files?.length === 0) return <Typography>نتیجه ای یافت نشد</Typography>;
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {files?.map((f) => (
          <Box component={Link} href={`/files/${f.id}`} key={f.id}>
            {f.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export { FileSearchListView };
