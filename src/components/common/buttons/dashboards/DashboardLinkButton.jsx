import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function DashboardLinkButton({dashboardId, loadDashboardInNewWindow, className, variant, closePanel}) {
  let history = useHistory();

  const loadDashboard = () => {
    if (loadDashboardInNewWindow) {
      window.open(`/insights/dashboards/${dashboardId}/viewer`);
    }
    else {
      history.push(`/inventory/tools/details/${dashboardId}/viewer`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadDashboard()} className={className ? className : "mb-2 small"} size={"sm"} variant={variant}>
      <span className="my-auto"><FontAwesomeIcon icon={faTools} className="pr-1" fixedWidth/>View Dashboard</span>
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
