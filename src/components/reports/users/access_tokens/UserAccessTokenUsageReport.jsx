import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useGetAccessTokenActivityLogs from "hooks/access_tokens/logs/useGetAccessTokenActivityLogs";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";
import InlineAccessTokenUsageUserSelectInput
  from "components/common/list_of_values_input/access_tokens/InlineAccessTokenUsageUserSelectInput";

export default function UserAccessTokenUsageReport() {
  const {
    accessTokenActivityLogs,
    accessTokenLogFilterModel,
    setAccessTokenLogFilterModel,
    isLoading,
    error,
    loadData,
  } = useGetAccessTokenActivityLogs();

  return (
    <ScreenContainer
      breadcrumbDestination={"accessTokenUsageReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"}/>}
    >
      <Row className={"mx-0 mb-2"}>
        <Col className={"px-2"}>
          <InlineAccessTokenUsageUserSelectInput
            model={accessTokenLogFilterModel}
            fieldName={"userId"}
            loadDataFunction={loadData}
          />
        </Col>
      </Row>
      <AccessTokenLogTable
        error={error}
        loadData={loadData}
        isLoading={isLoading}
        activityLogs={accessTokenActivityLogs}
        filterModel={accessTokenLogFilterModel}
        setFilterModel={setAccessTokenLogFilterModel}
        className={"mt-2 mx-2"}
        showUserField={true}
      />
    </ScreenContainer>
  );
}
