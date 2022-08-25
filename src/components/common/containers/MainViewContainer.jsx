import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";

export default function MainViewContainer({ children }) {
  const { backgroundColor } = useContext(AuthContext);

  return (
    <div
      className={"w-100"}
      style={{
        height: "100vh",
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
}

MainViewContainer.propTypes = {
  children: PropTypes.any,
};


