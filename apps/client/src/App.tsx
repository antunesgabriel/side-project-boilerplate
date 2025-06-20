import { BrowserRouter, Route, Routes } from "react-router";

import { Provider as TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { NotificationProvider } from "@repo/ui/components/ui/notification-provider";
import { Toaster } from "@repo/ui/components/ui/toast";

import { ThemeProvider } from "~/providers/theme-provider";

import { ProtectedLayout } from "~/layouts/protected.layout";
import { SettingsLayout } from "~/layouts/settings.layout";

import { SignInPage } from "~/pages/auth/sign-in.page";
import { WelcomePage } from "~/pages/welcome.page";
import { SignUpPage } from "~/pages/auth/sign-up.page";
import { VerifyEmailPage } from "~/pages/auth/verify-email.page";
import { OnboardingPage } from "~/pages/protected/onboarding.page";
import { ForgetPasswordPage } from "~/pages/auth/forget-password.page";
import { ResetPasswordPage } from "~/pages/auth/reset-password.page";
import { OverviewPage } from "~/pages/protected/overview.page";
import { GeneralPage } from "~/pages/protected/settings/general.page";
import { ProfilePage } from "~/pages/protected/settings/profile.page";
import { SecurityPage } from "~/pages/protected/settings/security.page";
import { NotificationsPage } from "~/pages/protected/settings/notifications.page";
import { IntegrationsPage } from "~/pages/protected/settings/integrations.page";
import { BillingPage } from "~/pages/protected/billing.page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="side-project-boilerplate-theme"
      >
        <TooltipProvider>
          <Routes>
            <Route path="/auth/sign-in" element={<SignInPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route
              path="/auth/forget-password"
              element={<ForgetPasswordPage />}
            />
            <Route
              path="/auth/reset-password"
              element={<ResetPasswordPage />}
            />

            <Route path="/welcome" element={<WelcomePage />} />

            <Route path="/" element={<ProtectedLayout />}>
              <Route index element={<OverviewPage />} />

              <Route path="onboarding" element={<OnboardingPage />} />

              <Route path="billing" element={<BillingPage />} />

              <Route path="settings" element={<SettingsLayout />}>
                <Route index element={<GeneralPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="security" element={<SecurityPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="integrations" element={<IntegrationsPage />} />
              </Route>
            </Route>
          </Routes>
        </TooltipProvider>
        <NotificationProvider />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
