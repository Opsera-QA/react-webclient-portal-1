import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AddChartOverlay from "components/insights/marketplace/charts/AddChartOverlay";

function ViewChartDetailsButton({ disable, marketplaceChart, dashboardId, className }) {
  const toastContext = useContext(DialogToastContext);

  const showChartDetails = () => {
    toastContext.showOverlayPanel(<AddChartOverlay kpiData={marketplaceChart} dashboardId={dashboardId} />);
  };

  return (
    <div className={className}>
      <Button
        variant={"secondary"}
        size={"sm"}
        disabled={disable}
        onClick={() => showChartDetails()}>
        <span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-2"/>View Chart Details</span>
      </Button>
    </div>
  );
}

ViewChartDetailsButton.propTypes = {
  disable: PropTypes.bool,
  marketplaceChart: PropTypes.object,
  dashboardId: PropTypes.string,
  className: PropTypes.string
};

export default React.memo(ViewChartDetailsButton);