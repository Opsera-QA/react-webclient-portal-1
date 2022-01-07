import React, {useState} from "react";
import PropTypes from "prop-types";
import {faTh} from "@fortawesome/pro-light-svg-icons";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import IconBase from "components/common/icons/IconBase";

function MetricContainer({ isLoading, children, title, chartHelpComponent }) {
  const [helpIsShown, setHelpIsShown] = useState(false);

  const closeHelpPanel = () => {
    setHelpIsShown(false);
  };

  const getHelpToggle = () => {
    if (chartHelpComponent && !helpIsShown) {
      return (
        <ActionBarToggleHelpButton
          helpIsShown={helpIsShown}
          toggleHelp={() => setHelpIsShown(!helpIsShown)}
          visible={!helpIsShown}
          size={"1x"}
        />
      );
    }
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><IconBase isLoading={true} className="mr-1"/>Loading Metric</span>);
    }

    return (
      <div className="d-flex justify-content-between">
        <div><IconBase icon={faTh} fixedWidth className="mr-1"/>{title}</div>
        <div className={"d-flex"}>
          {getHelpToggle()}
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (helpIsShown) {
      return (
        <div className={"m-2"}>
          {chartHelpComponent(closeHelpPanel)}
        </div>
      );
    }

    return (children);
  };

  return (
    <div className={`metric-container content-container content-card-1`}>
      <div className="px-2 content-block-header-inverse title-text-header-2">
        {getTitleBar()}
      </div>
      <div style={{padding: 0}} className={"new-chart m-2 shaded-panel"}>
        {getBody()}
      </div>
    </div>
  );
}


MetricContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string,
  chartHelpComponent: PropTypes.func
};

export default MetricContainer;