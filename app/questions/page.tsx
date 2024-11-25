"use server";
import { Box } from "@mui/material";
import { AddQuestion } from "../components/Question/AddQuestion";
import { auth } from "@/auth";
import { ListQuestions } from "../components/Question/ListQuestions";

const page = async () => {
  const session = await auth();
  return (
    <Box>
      <ListQuestions
        session={session!}
        fetchUrl={`${process.env.BACKEND_URL}/questions`}
      />
      <AddQuestion />
    </Box>
  );
};
export default page;
