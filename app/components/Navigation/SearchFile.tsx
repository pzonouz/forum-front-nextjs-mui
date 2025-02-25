"use client";
import {
  alpha,
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const SearchFile = () => {
  const router = useRouter();
  return (
    <Box>
      <FormControl variant="standard" sx={{ marginY: "1rem" }}>
        <InputLabel>جستجو در فایلها</InputLabel>
        <Input
          onKeyUp={(e) => {
            console.log(e.key);
            if (e.key == "Enter") {
              router.push(`/search/files?q=${e.target.value}`);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export { SearchFile };
