import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

const LatestQuestions = (props) => {
  const { questions, ...others } = props;
  return (
    <Box {...others}>
      <Box
        sx={{
          border: "1px solid #D1D5DB",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "6rem",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", paddingY: "1rem" }}
        >
          آخرین سوالات
        </Typography>
        {questions?.map((question: QuestionType, index: number) => (
          <MuiLink
            component={Link}
            key={question?.title}
            sx={[
              {
                padding: "1rem",
                width: "100%",
              },
              index % 2 == 0 && {
                backgroundColor: "#D1D5DB",
              },
              index % 2 != 0 && {
                backgroundColor: "#f7f8f9",
              },
            ]}
            href={`/Q&A/questions/${question.id}`}
          >
            {question?.title}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
};
export { LatestQuestions };
