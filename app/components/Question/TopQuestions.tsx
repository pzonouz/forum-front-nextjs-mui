"use server";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ListQuestions } from "./ListQuestions";
import { auth } from "@/auth";
import Link from "next/link";
import { QuestionSearchParams } from "@/app/types/QuestionTypes";
import { Suspense } from "react";
import { LoadingQuestion } from "./LoadingQuestion";

const TopQuestions = async ({
  searchParams,
}: {
  searchParams: QuestionSearchParams;
}) => {
  const session = await auth();
  let fetchUrl = `${process.env.BACKEND_URL}/questions`;
  switch (searchParams?.sort_by) {
    case "newest":
      fetchUrl += "?sort_by=created_at&sort_order=DESC";
      break;
    case "hottest":
      fetchUrl += "?sort_by=answers_count&sort_order=DESC";
      break;
    case "not_solved":
      fetchUrl += "?sort_by=not_solved&sort_order=DESC";
      break;
    case "no_answer":
      fetchUrl += "?sort_by=no_answer&sort_order=DESC";
      break;

    default:
      fetchUrl += "?sort_by=created_at&sort_order=DESC";
      break;
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        <Typography variant="h5">سوالات برتر</Typography>
      </Box>
      <ToggleButtonGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        value={searchParams?.sort_by || "newest"}
        color="primary"
        exclusive
      >
        <ToggleButton component={Link} href="?sort_by=newest" value="newest">
          جدیدترین
        </ToggleButton>
        <ToggleButton component={Link} href="?sort_by=hottest" value="hottest">
          داغترین
        </ToggleButton>
        <ToggleButton value="not_solved" href="?sort_by=not_solved">
          حل نشده
        </ToggleButton>
        <ToggleButton value="no_answer" href="?sort_by=no_answer">
          بدون پاسخ
        </ToggleButton>
      </ToggleButtonGroup>
      <Suspense fallback={<LoadingQuestion />}>
        <ListQuestions fetchUrl={fetchUrl} session={session!} />
      </Suspense>
    </Box>
  );
};
export { TopQuestions };
