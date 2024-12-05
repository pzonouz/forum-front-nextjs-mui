import { AnswerType } from "@/app/types/AnswerTypes";
import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const SearchListView = async ({ query }: { query: string }) => {
  const res = await fetch(`${process.env.BACKEND_URL}/search?query=${query}`);
  const data: { questions: QuestionType[]; answers: AnswerType[] } =
    await res.json();
  if (data?.questions.length === 0 && data?.answers.length === 0)
    return <Typography>نتیجه ای یافت نشد</Typography>;
  console.log(data?.answers);
  return (
    <Box>
      <Box>
        {data.questions?.map((q) => (
          <Box component={Link} href={`/questions/${q.id}`} key={q.id}>
            {q.title}
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: "0.5rem" }}>
        {data.answers?.map((q) => (
          <Box component={Link} href={`/questions/${q.question.id}`} key={q.id}>
            {q.description}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export { SearchListView };
