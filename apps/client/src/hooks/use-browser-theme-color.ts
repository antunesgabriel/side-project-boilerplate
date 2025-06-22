import { useEffect } from "react";

/**
 * Hook to manage browser theme color based on CSS variables
 */
export function useBrowserThemeColor() {
  useEffect(() => {
    const updateBrowserThemeColor = () => {
      const root = document.documentElement;

      // Get the computed CSS variable value for primary color
      const primaryColor = getComputedStyle(root)
        .getPropertyValue("--primary-base")
        .trim();

      // Fallback to default purple if CSS variable is not available
      const themeColor = primaryColor || "#7d52f4";

      // Update all theme-related meta tags
      const metaTags = [
        'meta[name="theme-color"]:not([media])',
        'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
        'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
        'meta[name="msapplication-navbutton-color"]',
      ];

      metaTags.forEach((selector) => {
        const metaTag = document.querySelector(selector);
        if (metaTag) {
          metaTag.setAttribute("content", themeColor);
        }
      });

      // Update Apple status bar style based on theme
      const appleStatusBar = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      );
      if (appleStatusBar) {
        const isDark = root.classList.contains("dark");
        appleStatusBar.setAttribute(
          "content",
          isDark ? "black-translucent" : "default"
        );
      }
    };

    // Update immediately
    updateBrowserThemeColor();

    // Create a MutationObserver to watch for class changes on the root element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          // Small delay to ensure CSS variables are updated
          setTimeout(updateBrowserThemeColor, 10);
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);
}
