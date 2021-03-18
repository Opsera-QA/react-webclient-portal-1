import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import ModelLinkButton from "components/common/buttons/link/ModelLinkButton";

function dashboardsButtonView({ dashboards }) {
  const getDashboardBadgeText = (dashboard) => {
    return dashboard?.name;
  };

  const getBadges = () => {
    if (!Array.isArray(dashboards) || dashboards.length === 0) {
      return null;
    }

    return (
      dashboards.map((dashboardData, index) => (
        <ModelLinkButton
          className={"mb-2"}
          key={index}
          dataModel={new Model({...dashboardData}, dashboardMetadata, false)}
          icon={faChartNetwork}
          text={getDashboardBadgeText(dashboardData)}
        />
      ))
    );
  }

  return (getBadges());
}

dashboardsButtonView.propTypes = {
  dashboards: PropTypes.array,
};

export default dashboardsButtonView;