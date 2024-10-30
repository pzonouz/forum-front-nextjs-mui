import { Box, Modal, Typography } from "@mui/material";
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
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      {children}
    </Modal>
  );
};
export { ModalComponenet };
