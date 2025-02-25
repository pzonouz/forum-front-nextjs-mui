import { Box } from "@mui/material";

import { ListFiles } from "../components/AdminFile/ListFiles";
import { ListBlog } from "../components/Blog/ListBlog";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex" }}>
      <ListBlog
        sx={{
          flex: 1,
          display: { xs: "none", sm: "block" },
        }}
      />
      <Box sx={{ flex: 2 }}>{children}</Box>
      {/* <ListFiles */}
      {/*   sx={{ */}
      {/*     width: "100%", */}
      {/*     bgcolor: "#F3F4F6", */}
      {/*     padding: "1rem", */}
      {/*     display: { xs: "none", md: "block" }, */}
      {/*     flex: 2, */}
      {/*   }} */}
      {/* /> */}
    </Box>
  );
}
