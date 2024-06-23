import "./App.css";
import "./style/common.style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export default App;
