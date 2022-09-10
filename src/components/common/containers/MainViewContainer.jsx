import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import useLocationReference from "hooks/useLocationReference";

export default function MainViewContainer({ children }) {
  const { locationKey } = useLocationReference();
  const { backgroundColor } = useContext(AuthContext);

  return (
    <div
      className={"w-100"}
      key={locationKey}
      style={{
        minHeight: "100vh",
        backgroundColor: backgroundColor,
        paddingBottom: "30px",
      }}
    >
      {children}
    </div>
  );
}

MainViewContainer.propTypes = {
  children: PropTypes.any,
};


