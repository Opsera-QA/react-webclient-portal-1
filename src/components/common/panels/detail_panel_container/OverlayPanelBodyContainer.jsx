import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";

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
      <div className={"mr-1"}>
        <ActionBarContainer>
          <div>
            {leftSideItems}
          </div>
          <div>
            {getHelpToggle()}
          </div>
        </ActionBarContainer>
      </div>
    );
  };

  const getBody = () => {
    if (helpIsShown && helpComponent) {
      return helpComponent;
    }

    return children;
  };

  return (
    <div>
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