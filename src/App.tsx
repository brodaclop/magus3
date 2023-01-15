import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Main } from './Main';

const App: React.FC<{}> = () => {

  const page = useRoutes([
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/karakter/:karakterId',
      element: <Main />
    },
    {
      path: '/entity/:entityId',
      element: <Main />
    }
  ]);

  return page;
};

const AppWrapper = () => <Router basename='/magus3'><App /></Router>;


export default AppWrapper;
