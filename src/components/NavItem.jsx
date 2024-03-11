import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";

export default function NavItem({ icon, title, active, isSidebarLarge, link }) {
  const [elementVisible, setElementVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setElementVisible(isSidebarLarge);
    }, 100);

    return () => clearTimeout(timer);
  }, [isSidebarLarge]);

  const handleClick = () => {
    if (isSidebarLarge) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <Flex mt={25} alignItems="center" h="45px">
      <Menu>
        <Link
          backgroundColor={active ? "#215174" : "transparent"}
          p={3}
          borderRadius={8}
          _hover={!active && { textDecor: "none", backgroundColor: "#AEC8CA" }}
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          onClick={handleClick}
          href={link}
        >
          <MenuButton>
            <Flex display="flex" alignItems="center">
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "white" : "black"}
              />
              {elementVisible && (
                <Text
                  ml={5}
                  display={isSidebarLarge ? "flex" : "none"}
                  color={active ? "white" : "black"}
                >
                  {title}
                </Text>
              )}
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
