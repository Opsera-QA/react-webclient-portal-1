import React, { useEffect } from "react";
import {useHistory} from "react-router-dom";

function Inventory() {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/inventory/tools`);
  }, []);

  return (
    <>
    </>
  );
}

export default Inventory;
