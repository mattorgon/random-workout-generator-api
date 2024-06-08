import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Form,
  Label,
  Input,
  Button,
  InvalidLogin,
} from "../styles/ComponentStyles";

const LogMeIn = ({ formData, setFormData }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { signIn } = useAuth();

  const handleChange = async (e) => {
    console.log("Event:", e);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the error message
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful, you can perform additional actions here
        const data = await response.json();
        // console.log("Login successful:", data);
        // console.log("ID: ", data.userID);
        // console.log("token: ", data.token);

        signIn(formData.username, data.userID, data.token);
      } else {
        // Login failed, update state to show the error message
        console.error("Login failed");
        // setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // useEffect(() => {
  //   console.log("formdata: ", formData);
  // }, [handleChange]);

  // useEffect(() => {
  //   console.log("lmi username: ", formData.username);
  // }, [handleSubmit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Username:
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
        />
      </Label>
      {/* <Label>
        Email:
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Label> */}
      <Label>
        Password:
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
        />
      </Label>
      <InvalidLogin>{errorMessage}</InvalidLogin>
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default LogMeIn;
