import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import Home from "./pages/Home.tsx";
import Features from "./pages/Features.tsx";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    // `base` is the Vite base path: "/" when served by the Express server
    // or in dev, "/neuralflow-landing-page/" on GitHub Pages. Wouter
    // ignores a base of "/", so this is a no-op outside Pages.
    //
    // The trailing slash MUST be stripped before handing the base to
    // wouter (3.7.1): it strips the base verbatim, so with the slash a
    // direct load of /neuralflow-landing-page/features becomes the
    // slash-less path "features", which matches no route — and the
    // path-less fallback <Route> cannot rescue it inside a <Switch>,
    // because wouter's Switch requires a truthy `path` prop and
    // regexparam's "*" pattern also requires a leading slash. The app
    // then renders nothing (blank page) on direct loads served via
    // Pages' 404.html, even though the nav click works (navigate()
    // builds "/neuralflow-landing-page//features", which strips back to
    // "/features"). Stripping the slash fixes direct loads and, as a
    // side effect, makes nav links single-slash too.
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features" component={Features} />
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
