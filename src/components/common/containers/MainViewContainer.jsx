import React from "react";
import PropTypes from "prop-types";
import useLocationReference from "hooks/useLocationReference";
import ToastContextProvider from "contexts/DialogToastContext";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import OpseraHeaderBar from "components/header/OpseraHeaderBar";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";

export default function MainViewContainer(
  {
    backgroundColor,
    children,
  }) {
  const {locationKey} = useLocationReference();

  const getNavBar = () => {
    return (
      <OpseraHeaderBar />
    );
  };

  return (
    <ToastContextProvider navBar={getNavBar()}>
      <div
        className={"w-100"}
        key={locationKey}
        style={{
          minHeight: `calc(100vh - ${screenContainerHeights.NAV_BAR_HEIGHT} - 30px)`,
          backgroundColor: backgroundColor,
          paddingBottom: "30px",
        }}
      >
        {children}
      </div>
    </ToastContextProvider>
  );
}

MainViewContainer.propTypes = {
  children: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  backgroundColor: PropTypes.string,
};


