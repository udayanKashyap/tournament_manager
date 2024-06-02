import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../store/store";

const HostelProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const username = useAdminStore((state) => state.username);
  const loading = useAdminStore((state) => state.loading);
  useEffect(() => {
    if (!username && !loading) {
      navigate("/login");
    }
  }, [navigate, loading]);
  if (loading) {
    return <div>Loading....</div>;
  }
  return <>{children}</>;
};

export default HostelProtectedRoute;
