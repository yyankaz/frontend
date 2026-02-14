import { Box, VStack, Image} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Logo from "../assets/Monstry_logo_01.png";
import Slogan from "../assets/Slogan.png";

const HomePage = () => {
  const navigate = useNavigate();

 return (
    <Box
      className="home-page"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={4}
    >
      <Image
        src={Logo}
        alt="Monstry Logo"
        maxW="700px"
        mb={4}
      />

      <Image
        src={Slogan}
        alt="Become a monster"
        maxW="7000px"
        mb={10}
      />

          <div className="slime-btn-start" onClick={() => navigate("/login")}></div>
          <div className="slime-btn-about" onClick={() => navigate("/login")}></div>
      <VStack spacing={4}>
      </VStack>
    </Box>
  );
};

export default HomePage;