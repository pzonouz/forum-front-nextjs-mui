"use server";

import { Answer } from "@/app/components/Answer/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { auth } from "@/auth";
import { AdminFileType } from "@/app/actions/File";
import Image from "next/image";

const page = async ({ params }: { params: any }) => {
  const session = await auth();
  const parameters = await params;
  const resAdminFile = await fetch(
    `${process.env.BACKEND_URL}/files/${parameters.id}`,
  );
  const adminFile: AdminFileType = (await resAdminFile.json())?.[0];
  const created_at = new Date(adminFile?.created_at).toLocaleString();
  const filename = adminFile?.filename;
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        ></Box>
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
              padding: "1rem",
            },
          ]}
        >
          <Box
            sx={{
              width: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {session?.user?.is_admin && (
              <IconButton
                sx={{ color: "primary.main" }}
                component={Link}
                href={`/admin/${parameters?.id}/edit`}
              >
                <EditIcon />
              </IconButton>
            )}
            {session?.user?.is_admin && (
              <IconButton
                sx={{ color: "error.main" }}
                component={Link}
                href={`/admin/${parameters?.id}/delete`}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ marginBottom: "1rem" }}>
              {adminFile?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                marginTop: "1rem",
              }}
            >
              <Typography
                sx={{ fontSize: "0.7rem", color: grey[700] }}
                component="span"
              >
                {created_at}
              </Typography>
            </Box>
            <Box
              id="files"
              sx={{ padding: "1rem", display: "flex", gap: "1rem" }}
            >
              <Link href={`http://localhost/showfile/${filename}`}>
                <Image
                  src={
                    filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                      ? `http://localhost/showfile/${filename}`
                      : `/images/computer.png`
                  }
                  alt={filename}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: "10%",
                    border: "1px solid black",
                  }}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default page;
