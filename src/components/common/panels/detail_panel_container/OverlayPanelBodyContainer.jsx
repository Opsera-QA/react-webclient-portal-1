import React, {useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";

function OverlayPanelBodyContainer({ children, className, helpComponent, isLoading, hideCloseButton }) {
  const [helpIsShown, setHelpIsShown] = useState(false);

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
          <div />
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
      {/*<div className={helpComponent ? "mx-2 px-3 pb-3" : "mx-2 p-3"}>*/}
        <div className={className}>
          {getBody()}
        </div>
      {/*</div>*/}
    </div>
  );
}


OverlayPanelBodyContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  helpComponent: PropTypes.object,
  className: PropTypes.string,
  hideCloseButton: PropTypes.bool,
};

export default OverlayPanelBodyContainer;