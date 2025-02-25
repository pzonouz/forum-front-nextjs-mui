"use client";
import {
  alpha,
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBarComponent = () => {
  const [searchActive, setSearchActive] = useState(false);
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Search
          sx={[
            searchActive && {
              marginRight: "-2rem",
            },
            {
              width: searchActive ? "90%" : "0",
              transition:
                "opacity 0.5s ease, visibility 0s 0.5s, width 0.5s ease",
            },
          ]}
        >
          {searchActive && (
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          )}
          <StyledInputBase
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search/?q=${e.currentTarget.value}`);
                setSearchActive(false);
              }
            }}
            placeholder="Search…"
          />
        </Search>

        {searchActive && (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setSearchActive(false)}
          >
            <ChevronRight />
          </IconButton>
        )}
        {!searchActive && (
          <IconButton onClick={() => setSearchActive(true)}>
            <SearchIcon sx={{ color: "white", fontSize: "2rem" }} />
          </IconButton>
        )}
        {!searchActive && (
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 600,
              textDecoration: "none",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
            }}
          >
            انجمن
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Search
          sx={[
            searchActive && {
              marginRight: "-2rem",
            },
            {
              width: searchActive ? "90%" : "0",
              transition:
                "opacity 0.5s ease, visibility 0s 0.5s, width 0.5s ease",
            },
          ]}
        >
          {searchActive && (
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          )}
          <StyledInputBase
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search/?q=${e.currentTarget.value}`);
                setSearchActive(false);
              }
            }}
            placeholder="Search…"
          />
        </Search>

        {searchActive && (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setSearchActive(false)}
          >
            <ChevronRight />
          </IconButton>
        )}
        {!searchActive && (
          <IconButton onClick={() => setSearchActive(true)}>
            <SearchIcon sx={{ color: "white", fontSize: "2rem" }} />
          </IconButton>
        )}
        {!searchActive && (
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 600,
              textDecoration: "none",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
            }}
          >
            انجمن
          </Typography>
        )}
      </Box>
    </>
  );
};

export { SearchBarComponent };
