import { ChakraProvider } from '@chakra-ui/react';
import LocalePreviewUrlExtension from "./LocalePreviewUrlExtension";

function App() {
  return (
    <ChakraProvider>
      <LocalePreviewUrlExtension />
    </ChakraProvider>
  );
}

export default App;
