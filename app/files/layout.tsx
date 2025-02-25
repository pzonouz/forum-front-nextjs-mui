import { Box } from "@mui/material";

import { ListBlog } from "../components/Blog/ListBlog";
import { LatestQuestions } from "../components/Question/LatestQuestions";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resQuestions = await fetch(`${process.env.BACKEND_URL}/questions/`);
  const questions = await resQuestions.json();
  return (
    <Box sx={{ display: "flex" }}>
      <ListBlog
        sx={{
          flex: 1,
          display: { xs: "none", sm: "block" },
        }}
      />
      <Box sx={{ flex: 2, padding: "1rem" }}>{children}</Box>
      <LatestQuestions
        sx={{
          marginRight: "1rem",
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
        questions={questions}
      />
    </Box>
  );
}
