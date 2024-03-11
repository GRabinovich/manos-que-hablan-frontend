"use client";
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiBook, FiUser, FiDollarSign } from "react-icons/fi";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isSidebarLarge = useSelector((state) => state.sidebar.large);

  const [elementVisible, setElementVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setElementVisible(isSidebarLarge);
    }, 100);

    return () => clearTimeout(timer);
  }, [isSidebarLarge]);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Flex
      position="fixed"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
      borderRadius="15px"
      w={isSidebarLarge ? "200px" : "80px"}
      flexDir="column"
      justifyContent="space-between"
      bg="white"
      zIndex={2}
      transition="width 0.3s ease"
    >
      <Flex flexDir="column" as="nav">
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={handleClick}
          ml="20px"
          w="40px"
          h="40px"
        />
        <Flex flexDir="column" ml="18px" mr="18px">
          <NavItem
            isSidebarLarge={isSidebarLarge}
            icon={FiHome}
            title="Inicio"
            link="/"
            active={currentPath == "/"}
          />
          <NavItem
            isSidebarLarge={isSidebarLarge}
            icon={FiBook}
            title="Cursos"
            link="/courses"
            active={currentPath == "/courses"}
          />
          <NavItem
            isSidebarLarge={isSidebarLarge}
            icon={FiUser}
            title="Estudiantes"
            link="/students"
            active={currentPath == "/students"}
          />
          <NavItem
            isSidebarLarge={isSidebarLarge}
            icon={FiDollarSign}
            title="Pagos"
            link="/payments"
            active={currentPath == "/payments"}
          />
        </Flex>
      </Flex>

      <Flex flexDir="column" w="100%" alignItems="center" h="80px">
        <Flex w="100%" pl="15px" pr="15px">
          <Divider />
        </Flex>
        <Link
          display="flex"
          alignItems="center"
          h="100%"
          w="100%"
          textDecor="none"
          _hover={{ textDecor: "none" }}
          onClick={() => isSidebarLarge && handleClick()}
        >
          <Avatar size="sm" src="" ml="24px" />
          {elementVisible && (
            <Flex
              flexDir="column"
              ml={4}
              display={isSidebarLarge ? "flex" : "none"}
            >
              <Heading as="h3" size="sm">
                John Doe
              </Heading>
              <Text color="grey">Admin</Text>
            </Flex>
          )}
        </Link>
      </Flex>
    </Flex>
  );
}
