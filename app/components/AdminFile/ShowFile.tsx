import { FileType } from "@/app/types/FileType";
import { Box, Button, Link, Typography } from "@mui/material";

const ShowFile = ({ file }: { file: FileType }) => {
  // href={`http://localhost/showfile/${file.filename}`}
  return (
    <Box
      sx={{
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1">
        {file?.title}
      </Typography>
      <Typography>تخصصی ترین انجمن برق خودرو کاملا رایگان در ایران</Typography>
      <Button
        href={`http://localhost/showfile/${file.filename}`}
        sx={{ marginY: "1rem" }}
        variant="contained"
      >
        دانلود
      </Button>
      <Typography variant="body1" sx={{ fontSize: "0.8rem" }}>
        دسترسی به انبوهی از پرسش ها و پاسخ های مربوطه در زمینه برق خودرو
      </Typography>
      <Link href="/">برای مشاهده آخرین سوالات کلیک کنید</Link>
    </Box>
  );
};

export { ShowFile };
