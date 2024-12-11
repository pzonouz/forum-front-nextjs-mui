"use client";
import { Alert, Box, IconButton, Snackbar, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";

const FileComponent = ({
  filename,
  setFilename,
}: {
  filename: string;
  setFilename: Function;
}) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean; message?: string }>(
    {
      open: false,
      message: "",
    },
  );
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<string>(filename);
  const image_extensionts = ["jpg", "png", "jpeg", "webp"];
  const imageTester = new RegExp(image_extensionts.join("|"));

  const handleUploadImage = (e: any) => {
    setLoading(true);
    fetch("/api/upload", {
      method: "POST",
      body: e.target.files?.[0],
      next: { tags: ["upload"] },
    })
      .then((res) => {
        if (res?.ok) return res?.json();
        throw res.json();
      })
      .then((data) => {
        setLoading(false);
        setFilename(data?.filename);
        setGallery(data?.filename);
      })
      .catch(() => {
        setLoading(false);
        setSnackbar({ open: true });
      });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbar({ open: false });
        }}
      >
        <Alert
          onClose={() => {
            setSnackbar({ open: false });
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message || "ایراد در آپلود فایل"}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          paddingBottom: "1rem",
        }}
      >
        {gallery && (
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={[
                {
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  backgroundColor: "white",
                },
                {
                  "&:hover": { color: "error", backgroundColor: "gray" },
                },
              ]}
              onClick={() => {
                setFilename("");
                setGallery("");
              }}
            >
              <DeleteIcon
                sx={[{ width: "1rem", height: "1rem" }]}
                color="error"
              />
            </IconButton>
            <Image
              src={
                filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                  ? `${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/${filename}`
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
          </Box>
        )}
      </Box>
      <LoadingButton
        loading={loading}
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleUploadImage} />
      </LoadingButton>
    </Box>
  );
};

export { FileComponent };
