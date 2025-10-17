import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/provider/theme-provider.tsx";
import { ActiveThemeProvider } from "./components/active-theme.tsx";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ActiveThemeProvider initialTheme="system">
         <Toaster position="top-right" richColors />
          <App />
        </ActiveThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);