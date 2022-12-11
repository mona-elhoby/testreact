import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { IconButton } from "@mui/material";
import { Provider } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import "./assets/style/mediaQuery.css";
import "./scss/style.scss";
import "mdbreact/dist/css/mdb.css";
import arStyle from "./app.css";
import enStyle from "./en-style.css";
import "./store/inceptors";
import { store } from "./store/index";
import { fetchToken, onMessageListener } from "./store/notification/firebase";
import ProtectedRoute from "./features/protectedRoute";
import { I18nProvider, LOCALES } from "./i18n";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Signin = React.lazy(() => import("./pages/login"));

const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

const App = () => {
  const [isRtl, setIsRtl] = useState(true);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") == "en" ? LOCALES.English : LOCALES.Arabic
  );

  isRtl ? require("./app.css") : require("./en-style.css");

  React.useLayoutEffect(() => {
    document.body.setAttribute(
      "dir",
      localStorage.getItem("dir") ? localStorage.getItem("dir") : "rtl"
    );
    document.documentElement.setAttribute("dir", localStorage.getItem("dir"));
  }, [isRtl]);

  // React.useEffect(() => {
  //   JSON.parse(localStorage.getItem('userInfo'))?.accessToken ? window.location.replace('/') :  window.location.replace('/login')
  // }, [])

  fetchToken(setTokenFound);

  const broadcast = new BroadcastChannel("background-message");
  broadcast.onmessage = (event) => {
    // console.log('message from service-worker:', event.data)
    setNotification({
      title: event.data.notification.title,
      body: event.data.notification.body,
    });
    setShow(true);
  };
  onMessageListener()
    .then((payload) => {
      console.log("payload: ", payload);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
    })
    .catch((err) => console.log("failed: ", err));

  const handleArabicTheme = () => {
    document.body.setAttribute("dir", "rtl");
    localStorage.setItem("dir", "rtl");
    localStorage.setItem("locale", "ar");
    setLocale(LOCALES.Arabic);
    setIsRtl(true);
  };
  const handleEnglishTheme = () => {
    document.body.setAttribute("dir", "ltr");
    localStorage.setItem("dir", "ltr");
    localStorage.setItem("locale", "en");
    setLocale(LOCALES.English);
    setIsRtl(false);
  };
  return (
    // <StylesProvider>
    <I18nProvider locale={locale}>
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={show}
          autoHideDuration={5000}
          onClose={() => setShow(false)}
          TransitionComponent={Slide}
          message={
            <>
              <h5 style={{ marginTop: 0, marginBottom: "5px" }}>
                {notification.title}
              </h5>
              <p style={{ marginTop: 0, marginBottom: 0 }}>
                {notification.body}
              </p>
            </>
          }
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={() => setShow(false)}
              >
                <NotificationsActiveIcon />
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClose={() => setShow(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
        <Provider store={store}>
          <Router>
            <Suspense fallback={loading}>
              <Routes>
                <Route
                  path="*"
                  name="Home"
                  render={() => {
                    JSON.parse(localStorage.getItem("userInfo"))
                      ?.accessToken ? (
                      <DefaultLayout
                        handleArabicTheme={handleArabicTheme}
                        handleEnglishTheme={handleEnglishTheme}
                      />
                    ) : (
					  redirect("/login")
                    );
                  }}
                  element={
                    <DefaultLayout
                      handleArabicTheme={handleArabicTheme}
                      handleEnglishTheme={handleEnglishTheme}
                    />
                  }
                />
                <Route
                  path="/login"
                  exact
                  name="Login Page"
                  element={<Signin />}
                />

                {/* <ProtectedRoute 
										path="*" 
										name="Home" 
										element={<DefaultLayout handleArabicTheme={handleArabicTheme} handleEnglishTheme={handleEnglishTheme} />} /> */}
              </Routes>
            </Suspense>
          </Router>
        </Provider>
      </ThemeProvider>
    </I18nProvider>
    // </StylesProvider>
  );
};

export default App;
