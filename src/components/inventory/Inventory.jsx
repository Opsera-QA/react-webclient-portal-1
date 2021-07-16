import React, { useEffect } from "react";
import {useHistory} from "react-router-dom";

function Inventory() {
  const history = useHistory();

  useEffect(() => {
    history.push(`/inventory/tools`);
  }, []);

  return (
    <>
    </>
  );
}

export default Inventory;
