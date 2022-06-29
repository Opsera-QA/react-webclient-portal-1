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
      return (
        <div className={"py-5"}>
          <InlineInformation
            className={"mt-1 mb-3"}
            message={
              `
                No Dashboard Templates Found. 
                You can publish a dashboard to your private catalog when viewing its details. 
                Opsera will be providing pre-made dashboards in the public catalog in the future. 
              `
            }
          />
        </div>
      );
    }

    return (
      <CardColumns>
        {dashboardTemplates.map((dashboardTemplate, index) => {
          let source = dashboardTemplateFilterModel?.getFilterValue("source");
          return (
            <DashboardTemplateCard
              key={index}
              dashboardTemplate={dashboardTemplate}
              catalog={source === "customer" ? "private" : "public"}
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

DashboardTemplateCardView.propTypes = {
  dashboardTemplates: PropTypes.array,
  dashboardTemplateFilterModel: PropTypes.object,
  setDashboardTemplateFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default DashboardTemplateCardView;