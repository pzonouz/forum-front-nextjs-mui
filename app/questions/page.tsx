"use server";
import { Box } from "@mui/material";
import { auth } from "@/auth";
import { ListQuestions } from "../components/Question/ListQuestions";
import { CreateQuestion } from "../components/Question/CreateQuestion";

const page = async () => {
  const session = await auth();
  return (
    <Box>
      <ListQuestions
        session={session!}
        fetchUrl={`${process.env.BACKEND_URL}/questions`}
      />
      <CreateQuestion />
    </Box>
  );
};
export default page;
