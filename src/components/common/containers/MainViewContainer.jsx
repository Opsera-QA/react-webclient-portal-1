import React from "react";
import PropTypes from "prop-types";
import useLocationReference from "hooks/useLocationReference";
import ToastContextProvider from "contexts/DialogToastContext";
import OpseraHeaderBar from "components/header/OpseraHeaderBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import HeaderNavBar from "components/header/legacy/HeaderNavBar";

export default function MainViewContainer(
  {
    isAuthenticated,
    userData,
    backgroundColor,
    children,
  }) {
  const {locationKey} = useLocationReference();
  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getNavBar = () => {
    if (isFreeTrial === true) {
      return (
        <OpseraHeaderBar
          hideAuthComponents={!isAuthenticated}
          userData={userData}
        />
      );
    }

    return (
      <HeaderNavBar
        userData={userData}
        hideAuthComponents={!isAuthenticated}
      />
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
  userData: PropTypes.object,
  backgroundColor: PropTypes.string,
};


