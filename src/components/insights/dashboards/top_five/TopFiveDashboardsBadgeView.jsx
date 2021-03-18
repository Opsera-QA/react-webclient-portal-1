import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomModelLinkBadge from "components/common/badges/CustomModelLinkBadge";

function dashboardsBadgeView({ dashboards }) {
  const getDashboardBadgeText = (dashboard) => {
    return dashboard?.name;
  };

  const getBadges = () => {
    if (!Array.isArray(dashboards) || dashboards.length === 0) {
      return null;
    }

    return (
      dashboards.map((dashboardData, index) => (
        <CustomModelLinkBadge
          key={index}
          dataModel={new Model({...dashboardData}, dashboardMetadata, false)}
          icon={faChartNetwork}
          badgeText={getDashboardBadgeText(dashboardData)}
        />
      ))
    );
  }

  return (
    <CustomBadgeContainer>
      {getBadges()}
    </CustomBadgeContainer>
  );
}

dashboardsBadgeView.propTypes = {
  dashboards: PropTypes.array,
};

export default dashboardsBadgeView;