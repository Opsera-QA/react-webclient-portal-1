import React from "react";
import PropTypes from "prop-types";
import useLocationReference from "hooks/useLocationReference";
import ToastContextProvider from "contexts/DialogToastContext";
import OpseraHeaderBar from "components/header/OpseraHeaderBar";

export default function MainViewContainer(
  {
    isAuthenticated,
    userData,
    backgroundColor,
    children,
  }) {
  const { locationKey } = useLocationReference();

  const getNavBar = () => {
    return (
      <OpseraHeaderBar
        hideAuthComponents={!isAuthenticated}
        userData={userData}
      />
    );
  };

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
        <ToastContextProvider navBar={getNavBar()}>
          {children}
        </ToastContextProvider>
      </div>
  );
}

MainViewContainer.propTypes = {
  children: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  backgroundColor: PropTypes.string,
};


