"use client";
import ReduxProvider from "@/redux/ReduxProvider";
import "./global.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

function LayoutUI() {
  const isSidebarLarge = useSelector((state) => state.sidebar.large);

  return (
    <>
      {isSidebarLarge && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex={1}
          bg="rgba(0, 0, 0, 0.5)"
        />
      )}
      <Sidebar />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <ChakraProvider>
            <LayoutUI />
            <main>
              {children}
            </main>
          </ChakraProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
