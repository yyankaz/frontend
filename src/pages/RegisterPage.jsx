import {
  Box,
  Heading,
  Input,
  VStack,
  Text,
  InputGroup, 
  InputRightElement,
  FormHelperText,
  FormControl
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
  const passwordValid =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const formValid =
  username.length >= 5 &&
  passwordValid &&
  password === confirmPassword;


  const length_password = password.length;
  const length_confirmPassword = confirmPassword.length;
  const length_username = username.length;

  const counterColor_password =
  length_password === 0
    ? "gray"
    : length_password < 8
    ? "red"
    : "green";

    const counterColor_confirmPassword =
  length_confirmPassword === 0
    ? "gray"
    : length_confirmPassword < 8
    ? "red"
    : "green";

  const counterColor_username =
  length_username === 0
    ? "gray"
    : length_username < 5
    ? "red"
    : "green";


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

          <FormControl>
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

            <FormHelperText fontSize="10px"  mt="2px">
              Username should have at least 5 characters.
            </FormHelperText>
          </FormControl>

          <FormControl>
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
            <FormHelperText fontSize="10px"  mt="2px">
              At least 8 characters with uppercase, lowercase letters and numbers.
            <Text color={hasUpper ? "green" : "red"}>
              • Uppercase
            </Text>
            <Text color={hasLower ? "green" : "red"}>
              • Lowercase
            </Text>
            <Text color={hasNumber ? "green" : "red"}>
              • Number
            </Text>
            </FormHelperText>
          </FormControl>

          <FormControl>
          <InputGroup>
          <Input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            maxLength={32}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

            <InputRightElement width="39px">
              <Text fontSize="sm" color={counterColor_confirmPassword}>
                {length_confirmPassword}/{32}
              </Text>
            </InputRightElement>
          </InputGroup>
          </FormControl>

          <div
            className="slime-btn-sign-up"
            onClick={formValid ? register : undefined}
            style={{
              opacity: formValid ? 1 : 0.5,
              pointerEvents: formValid ? "auto" : "none",
            }}
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