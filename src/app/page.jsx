import { Navbar } from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <>
        <Navbar />
        <main></main>
      </>
    </ChakraProvider>
  );
}
