import { useState } from "react";
import { updateUser, auth, changePassword } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { open, data } = useSelector((state) => state.modal);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({ displayName, photoURL: avatar });
    navigate("/");
    dispatch(loginUser(auth.currentUser));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const result = await changePassword(password);
    if (result) {
      setPassword("");
    } else handleOpen();
  };

  return (
    <>
      {open && <Modal name={open} data={data} handleOpen={handleOpen} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              required
              fullWidth
              id="displayName"
              label="Display Name"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              id="photo"
              label="Avatar Photo"
              sx={{ mt: 2 }}
              name="photoURL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Profile
            </Button>
          </Box>
        </Box>
      </Container>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleResetPassword}
            sx={{ mt: 3 }}
          >
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!password}
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
