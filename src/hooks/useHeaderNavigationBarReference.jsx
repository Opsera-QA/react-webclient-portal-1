import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";

export default function useHeaderNavigationBarReference(newHeaderNavigationBar) {
  const {
    headerNavigationBar,
    setHeaderNavigationBar,
  } = useContext(AuthContext);

  useEffect(() => {
    setHeaderNavigationBar(newHeaderNavigationBar);

    return () => {
      setHeaderNavigationBar(undefined);
    };
  }, []);

  return ({
    headerNavigationBar: headerNavigationBar, // TODO: Test this and ensure it doesn't cause anything weird
    setHeaderNavigationBar: setHeaderNavigationBar,
  });
}
