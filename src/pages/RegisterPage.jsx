import {
  Box,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;

  const register = async () => {
  if (password !== confirmPassword) return;

  const response = await fetch("https://to-do-list-project-63o5.onrender.com/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    navigate("/login"); 
  } else {
    alert("Registration error.");
  }
};

  return (
    <Box
      className="register-page"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        width="350px"
      >
        <VStack spacing={4}>
          <Heading size="md">Registration</Heading>

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div
            className={`slime-btn-sign-up ${
              !passwordsMatch || !password ? "disabled" : ""
            }`} onClick={register}
          ></div>

          {!passwordsMatch && confirmPassword && (
            <Text fontSize="xs" color="red.400">
              Passwords do not match
            </Text>
          )}

          <Text fontSize="sm" color="gray.500">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.600"
              fontWeight="semibold"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => navigate("/login")}
            >
              Log in!
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}