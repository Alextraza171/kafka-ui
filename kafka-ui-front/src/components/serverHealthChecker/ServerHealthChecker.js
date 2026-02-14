import { useEffect } from "react";
import { checkHealth } from '../../services/api';

function ServerHealthChecker() {
  useEffect(() => {
    const checkServer = async () => {
      try {
        await checkHealth();
        window.dispatchEvent(new CustomEvent("server:online"));
      } catch {
        window.dispatchEvent(new CustomEvent("server:offline"));
      }
    };

    checkServer();

    const interval = setInterval(checkServer, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default ServerHealthChecker;
