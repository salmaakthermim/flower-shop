import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/dashboard/admin");
    else if (user.role === "customer") navigate("/dashboard/customer");
    else navigate("/dashboard/guest");
  }, [user, navigate]);

  return null;
}
