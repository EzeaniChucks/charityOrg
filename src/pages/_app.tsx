import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark-theme");
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
