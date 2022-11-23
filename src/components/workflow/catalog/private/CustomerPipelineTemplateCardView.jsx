import React from "react";
import PropTypes from "prop-types";
import {CardColumns} from "react-bootstrap";
import CardView from "components/common/card/CardView";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import LoadingDialog from "components/common/status_notifications/loading";
import CustomerDashboardTemplateCard
  from "components/insights/marketplace/dashboards/templates/private/CustomerDashboardTemplateCard";

function CustomerPipelineTemplateCardView(
  {
    dashboardTemplates,
    dashboardTemplateFilterModel,
    setDashboardTemplateFilterModel,
    loadData,
    isLoading,
  }) {
  const getCards = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Dashboard Templates"} size={"sm"} />;
    }

    if (!Array.isArray(dashboardTemplates) || dashboardTemplates.length === 0) {
      return (
        <div className={"py-5"}>
          <InlineInformation
            className={"mt-1 mb-3"}
            message={`No Customer Catalog Dashboard Templates Found.`}
          />
        </div>
      );
    }

    return (
      <CardColumns>
        {dashboardTemplates.map((dashboardTemplate, index) => {
          return (
            <CustomerDashboardTemplateCard
              key={index}
              dashboardTemplate={dashboardTemplate}
              loadData={loadData}
            />
         );
        })}
      </CardColumns>
    );
  };

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

CustomerPipelineTemplateCardView.propTypes = {
  dashboardTemplates: PropTypes.array,
  dashboardTemplateFilterModel: PropTypes.object,
  setDashboardTemplateFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default CustomerPipelineTemplateCardView;