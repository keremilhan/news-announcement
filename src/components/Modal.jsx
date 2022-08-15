import modals from "../modals";
import Box from "@mui/material/Box";
import { Modal as ModalUi } from "@mui/material/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modal = ({ name, data, isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  const currentModal = modals.find((m) => m.name === name);

  return (
    <div>
      <ModalUi
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <currentModal.element handleClose={handleClose} />
        </Box>
      </ModalUi>
    </div>
  );
};

export default Modal;
