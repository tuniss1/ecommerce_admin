import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Link,
} from "@mui/material";
import Router from "next/router";
import { useState } from "react";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";

export const CategoryListToolbar = ({ isSelected, setSearchField, setOpen, ...rest }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Box {...rest}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Categories
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => Router.push("/categories/create")}
          >
            Add category
          </Button>
        </Box>
      </Box>
      {/* <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ maxWidth: 500, height: 48 }}>
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                  size: "small",
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search product"
                variant="outlined"
                sx={{ maxWidth: 500 }}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{ ml: 1, height: 40 }}
                onClick={() => setSearchField(searchText)}
              >
                Search
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </Box>
  );
};
