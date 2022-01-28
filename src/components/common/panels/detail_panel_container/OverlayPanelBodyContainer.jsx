import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";

function OverlayPanelBodyContainer({ children, className, helpIsShown, setHelpIsShown, helpComponent, isLoading, hideCloseButton, leftSideItems }) {
  if (isLoading) {
    return (<LoadingDialog size="sm" message={"Loading Data"}/>);
  }

  const getHelpToggle = () => {
    if (helpComponent) {
      return (
        <ActionBarToggleHelpButton
          helpIsShown={helpIsShown}
          toggleHelp={() => setHelpIsShown(!helpIsShown)}
        />
      );
    }
  };

  const getActionBar = () => {
    if (helpIsShown === true && hideCloseButton === true) {
      return null;
    }

    return (
      <div className={"d-flex px-3 mr-1 justify-content-between pt-2"}>
        <div>
          {leftSideItems}
        </div>
        <div>
          {getHelpToggle()}
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (helpIsShown && helpComponent) {
      return (
        <div className={"p-2"}>
          {helpComponent}
        </div>
      );
    }

    return children;
  };

  return (
    <div className={"w-100"}>
      {getActionBar()}
      <div className={className}>
        {getBody()}
      </div>
    </div>
  );
}


OverlayPanelBodyContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  helpComponent: PropTypes.object,
  className: PropTypes.string,
  hideCloseButton: PropTypes.bool,
  helpIsShown: PropTypes.bool,
  setHelpIsShown: PropTypes.func,
  leftSideItems: PropTypes.any,
};

export default OverlayPanelBodyContainer;