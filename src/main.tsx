import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { StyledEngineProvider } from "@mui/material";
import { AxiosInstanceComponent } from "./common/interceptor/axiosInstance.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
        <AxiosInstanceComponent/>
      </Provider>
    </StyledEngineProvider>
  </>
);
