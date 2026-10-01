import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import * as pages from './components/Pages';
import './index.css';

const router = createHashRouter(
  Object.entries(pages).map(([, Element]) => ({
    ...Element,
    element: <Element />,
  })),
);

function App() {
  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
