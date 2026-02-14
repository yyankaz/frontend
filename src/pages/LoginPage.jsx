import {
  Box,
  Heading,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./LoginPage.css";

export default function LoginPage() {
const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  const login = async () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await fetch("https://to-do-list-project-63o5.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      credentials: "include",
    });

    if (response.ok) {
      navigate("/boards/all");
    } else {
      alert("Ошибка логина");
    }
  };



  return (
    <Box
    className="login-page"
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
          <Heading size="md">Logging in</Heading>

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

            <VStack spacing={1}>
              <div className="slime-btn-log_in" onClick={login}></div>

              <Text fontSize="sm" color="gray.500">
                Don't have an account?{" "}
                <Text
                  as="span"
                  color="purple.600"
                  fontWeight="semibold"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => navigate("/user/register")}
                >
                  Create it!
                </Text>
              </Text>
            </VStack>
        </VStack>
      </Box>
    </Box>
  );
}