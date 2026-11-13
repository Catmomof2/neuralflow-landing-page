import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import Home from "./pages/Home.tsx";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    // `base` is the Vite base path: "/" when served by the Express server
    // or in dev, "/neuralflow-landing-page/" on GitHub Pages. Wouter
    // ignores a base of "/", so this is a no-op outside Pages.
    <WouterRouter base={import.meta.env.BASE_URL}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
