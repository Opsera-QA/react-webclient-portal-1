import React from "react";
import PropTypes from "prop-types";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function DashboardLinkButton({dashboardId, loadDashboardInNewWindow, className, variant, closePanel}) {
  let history = useHistory();

  const loadDashboard = () => {
    if (loadDashboardInNewWindow) {
      window.open(`/insights/dashboards/${dashboardId}/viewer`);
    }
    else {
      history.push(`/insights/dashboards/${dashboardId}/viewer`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadDashboard()} className={className ? className : "mb-2"} size={"sm"} variant={variant}>
      <span className="my-auto"><IconBase icon={faChartNetwork} className={"pr-1"}/>View</span>
    </Button>
  );
}

DashboardLinkButton.propTypes = {
  dashboardId: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  loadDashboardInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default DashboardLinkButton;
