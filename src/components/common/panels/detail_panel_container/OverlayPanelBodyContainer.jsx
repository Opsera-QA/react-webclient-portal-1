import React, {useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";

function OverlayPanelBodyContainer(
  {
    children,
    className,
    isLoading,
    hideCloseButton,
    leftSideItems,
    getHelpComponentFunction,
  }) {
  const [helpIsShown, setHelpIsShown] = useState(false);

  if (isLoading) {
    return (<LoadingDialog size="sm" message={"Loading Data"}/>);
  }

  const getHelpToggle = () => {
    if (getHelpComponentFunction && getHelpComponentFunction(setHelpIsShown)) {
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
    if (helpIsShown && getHelpComponentFunction && getHelpComponentFunction(setHelpIsShown)) {
      return (
        <div className={"p-2"}>
          {getHelpComponentFunction(setHelpIsShown)}
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
  className: PropTypes.string,
  hideCloseButton: PropTypes.bool,
  leftSideItems: PropTypes.any,
  getHelpComponentFunction: PropTypes.func,
};

export default OverlayPanelBodyContainer;