import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    // Muestra un indicador de carga mientras se verifica la autenticación
    return <p style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      display: "flex",
      alignItems: "center"
    }}>Loading...</p>;
  }
  if (!currentUser) {
    // Redirige al login con el parámetro de la ruta actual
    return <Navigate to={`/auth?redirect=${location.pathname.slice(1)}`} />;
  }
  return children;
};

export default ProtectedRoute;
