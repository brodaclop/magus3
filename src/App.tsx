import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Main } from './Main';

export const APP_BASE = '/magus3';

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

const AppWrapper = () => <Router basename={APP_BASE}><App /></Router>;


export default AppWrapper;
