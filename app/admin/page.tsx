"use server";
import { Box } from "@mui/material";
import { auth } from "@/auth";
import { ListAdminFiles } from "../components/AdminFile/ListAdminFiles";
import { CreateAdminFile } from "../components/AdminFile/CreateAdminFile";

const page = async () => {
  const session = await auth();
  return (
    <Box>
      <ListAdminFiles session={session!} />
      <CreateAdminFile />
    </Box>
  );
};
export default page;
