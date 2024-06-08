import React, { useState } from "react";
import Modal from "react-modal";
import LogMeIn from "./LogMeIn";
import {
  LoginButtonStyled,
  ModalContent,
  CloseButton,
} from "../styles/ComponentStyles";

const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <LoginButtonStyled onClick={openModal}>Login</LoginButtonStyled>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Sign Up Modal"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly darken the background
          },
          content: {
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px", // Limit the max width for better responsiveness
            height: "auto",
            maxHeight: "80%", // Limit the max height for better responsiveness
            overflow: "auto",
            background: "#fff",
            border: "none", // Remove default border
            borderRadius: "8px", // Add rounded corners
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Apply a nice shadow
            padding: "20px", // Add some padding inside the modal
            outline: "none", // Remove outline
          },
        }}
      >
        <ModalContent>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <LogMeIn formData={formData} setFormData={setFormData} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginButton;
