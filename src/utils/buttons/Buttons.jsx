import { Button } from "@mui/material";
import { red, lightBlue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

export const UpdateButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: lightBlue[500],
  "&:hover": {
    backgroundColor: lightBlue[700],
  },
}));
