import { Box, Button } from "@mui/material";

const DesktopMenu = ({
  pages,
}: {
  pages: { name: string; path: string }[];
}) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page?.name}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page?.name}
        </Button>
      ))}
    </Box>
  );
};
export { DesktopMenu };
