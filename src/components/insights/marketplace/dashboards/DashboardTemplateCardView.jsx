import React from "react";
import PropTypes from "prop-types";
import {CardColumns} from "react-bootstrap";
import CardView from "components/common/card/CardView";
import DashboardTemplateCard from "components/insights/marketplace/dashboards/DashboardTemplateCard";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import LoadingDialog from "components/common/status_notifications/loading";

function DashboardTemplateCardView({ dashboardTemplates, dashboardTemplateFilterModel, setDashboardTemplateFilterModel, loadData, isLoading }) {
  const getCards = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Dashboard Templates"} size={"sm"} />;
    }

    if (!Array.isArray(dashboardTemplates) || dashboardTemplates.length === 0) {
      return (<InlineInformation message={"No Dashboard Templates Found"} />);
    }

    return (
      <CardColumns>
        {dashboardTemplates.map((dashboardTemplate, index) => {
          return (<DashboardTemplateCard key={index} dashboardTemplate={dashboardTemplate} catalog={dashboardTemplateFilterModel?.getFilterValue("source")} />)
        })}
      </CardColumns>
    );
  }

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setDashboardTemplateFilterModel}
      paginationDto={dashboardTemplateFilterModel}
      cards={getCards()}
    />
  );
}

DashboardTemplateCardView.propTypes = {
  dashboardTemplates: PropTypes.array,
  dashboardTemplateFilterModel: PropTypes.object,
  setDashboardTemplateFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default DashboardTemplateCardView;