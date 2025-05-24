import { BrowserRouter, Route, Routes } from "react-router";

import { Provider as TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { NotificationProvider } from "@repo/ui/components/ui/notification-provider";
import { Toaster } from "@repo/ui/components/ui/toast";

import { ThemeProvider } from "~/providers/theme-provider";
import { SignInPage } from "~/pages/auth/sign-in.page";
import { WelcomeLayout } from "~/layouts/welcome.layout";
import { WelcomePage } from "~/pages/welcome.page";
import { SignUpPage } from "~/pages/auth/sign-up.page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="side-project-boilerplate-theme"
      >
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<WelcomeLayout />}>
              <Route index element={<WelcomePage />} />
            </Route>

            <Route path="/auth/sign-in" element={<SignInPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
          </Routes>
        </TooltipProvider>
        <NotificationProvider />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
