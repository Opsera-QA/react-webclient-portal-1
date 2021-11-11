import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AddChartOverlay from "components/insights/marketplace/charts/AddChartOverlay";
import IconBase from "components/common/icons/IconBase";

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
        <div className={"text-nowrap"}>
          <IconBase
            icon={faSearchPlus}
            className={"mr-2"}
          />
          Details
        </div>
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