import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
   {
      path: '/',
      element: <div>Hello World</div>,
   },
]);

export const MainNavigation = () => {
   return <RouterProvider router={router} />;
};
