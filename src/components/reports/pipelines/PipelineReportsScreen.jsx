import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import PipelineReports from "components/reports/pipelines/PipelineReports";

function PipelineReportsScreen() {

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"pipelineReports"} />}
      breadcrumbDestination={"pipelineReports"}
      pageDescription={"View reports from this dashboard."}
    >
      <PipelineReports />
    </ScreenContainer>
  );
}

export default PipelineReportsScreen;

