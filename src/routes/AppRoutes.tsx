import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout, ProtectedRoute, PublicRoute } from '../components/layout';
import { NotFoundPage } from '../pages/NotFound';
import { protectedRoutes, publicRoutes } from './config';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
