import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useHostelStore } from "../store/store";

const HostelProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const name = useHostelStore((state) => state.name);
  const loading = useHostelStore((state) => state.loading);
  const id = useHostelStore((state) => state.id);
  useEffect(() => {
    if (!name && !id && !loading) {
      navigate("/login");
    }
  }, [navigate, loading]);
  if (loading) {
    return <div>Loading....</div>;
  }
  return <>{children}</>;
};

export default HostelProtectedRoute;
