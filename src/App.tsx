import { Provider } from "react-redux";
import PageRoutes from "./PageRoutes";
import store from "./store";

function App() {
  return (
    <div className="w-screen h-screen">
      <Provider store={store}>
        <PageRoutes />
      </Provider>
    </div>
  );
}

export default App;
