import { Box, Modal } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";

const ModalComponenet = ({
  children,
  open,
  setOpen,
}: {
  children: ReactElement<unknown, string | JSXElementConstructor<any>>;
  open: boolean;
  setOpen: Function;
}) => {
  return (
    <Modal
      sx={{ marginX: "auto" }}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box
        sx={{
          marginX: "auto",
          backgroundColor: "white",
          marginTop: "4rem",
          maxWidth: { xs: "90%", md: "35rem" },
          maxHeight: "90vh",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
export { ModalComponenet };
