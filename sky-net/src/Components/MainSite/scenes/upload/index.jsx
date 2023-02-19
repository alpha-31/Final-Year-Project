import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import VideoFile from "@mui/icons-material/VideoFile";
import Stack from "@mui/material/Stack";
import Add from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { Toolbar, useTheme, List, ListItem, Paper } from "@mui/material";
import { tokens } from "../../theme/theme";
import MediaCard from "../../components/MediaCard";
const Upload = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Stack direction="column" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: "200px",
            height: "200px",
            borderColor: colors.greenAccent[500],
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            color="secondary"
            aria-label="upload video"
            component="label"
            sx={{
              width: "50px",
              height: "50px",
            }}
          >
            <input hidden accept="image/*" type="file" />
            <Add />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          component="label"
          color="secondary"
          sx={{ width: "200px" }}
          endIcon={<VideoFile />}
        >
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Paper style={{ maxHeight: 300, overflow: "auto", display: "flex" }}>
          <List
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              "& > li": { width: "fit-content" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItem>
              <MediaCard />
            </ListItem>
            <ListItem>
              <MediaCard />
            </ListItem>
            <ListItem>
              <MediaCard />
            </ListItem>
            <ListItem>
              <MediaCard />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </>
  );
};

export default Upload;
