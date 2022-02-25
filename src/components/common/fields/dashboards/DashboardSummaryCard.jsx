import React from "react";
import PropTypes from "prop-types";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import TitleBar from "components/common/fields/TitleBar";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import DescriptionField from "components/common/fields/text/DescriptionField";
import DashboardLinkButton from "components/common/buttons/dashboards/DashboardLinkButton";

function DashboardSummaryCard({ dashboardModel, isLoading, loadDashboardInNewWindow, closePanel }) {
  const getTitleBar = () => {
    return <TitleBar titleIcon={faChartNetwork} title={`${dashboardModel.getData("name")}`} isLoading={isLoading} />;
  };

  if (isLoading) {
    return <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading}>
      <div className={"px-2"}>
        <div className="mb-2">
          <DescriptionField dataObject={dashboardModel} fieldName={"description"}/>
        </div>
        <div className="mb-2">
          <TagField dataObject={dashboardModel} fieldName={"tags"} showLabel={false}/>
        </div>
        <div className="d-flex justify-content-between">
          <DateFieldBase dataObject={dashboardModel} fieldName={"createdAt"}/>
          <DateFieldBase dataObject={dashboardModel} fieldName={"updatedAt"}/>
          <DashboardLinkButton dashboardId={dashboardModel.getData("_id")} loadDashboardInNewWindow={loadDashboardInNewWindow} closePanel={closePanel}/>
        </div>
      </div>
    </CardContainerBase>
  );
}

DashboardSummaryCard.propTypes = {
  dashboardModel: PropTypes.object,
  isLoading: PropTypes.bool,
  loadDashboardInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default DashboardSummaryCard;
