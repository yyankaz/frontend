import {
  Box,
  Heading,
  Input,
  VStack,
  Text,
  InputGroup, 
  InputRightElement,
  useToast
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./LoginPage.css";

export default function LoginPage() {
const navigate = useNavigate();
const toast = useToast();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
  const length_password = password.length;
  const length_username = username.length;

  const counterColor_password =
  length_password === 0
    ? "gray"
    : length_password < 8
    ? "red"
    : "green";

  const counterColor_username =
  length_username === 0
    ? "gray"
    : length_username < 5
    ? "red"
    : "green";

const login = async () => {
  try {
    const response = await fetch(
      "https://to-do-list-project-63o5.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        toast({
          title: "Invalid username or password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    const token = await response.text();
    localStorage.setItem("token", token);

    toast({
      title: "Login successful",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/boards/all");

  } catch (error) {
    toast({
      title: "Server not responding",
      description: "Please try again later",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
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

          <InputGroup>
          <Input
            placeholder="Username"
            value={username}
            maxLength={32}
            onChange={(e) => setUsername(e.target.value)}
          />

            <InputRightElement width="39px">
              <Text fontSize="sm" color={counterColor_username}>
                {length_username}/{32}
              </Text>
            </InputRightElement>
          </InputGroup>

          <InputGroup>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            maxLength={32}
            onChange={(e) => setPassword(e.target.value)}
          />

            <InputRightElement width="39px">
              <Text fontSize="sm" color={counterColor_password}>
                {length_password}/{32}
              </Text>
            </InputRightElement>
          </InputGroup>


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