import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import useGetAccessTokenActivityLogs from "hooks/access_tokens/useGetAccessTokenActivityLogs";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";

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
          <OwnershipReportLdapUserSelectInput
            model={accessTokenLogFilterModel}
            loadData={loadData}
            placeholderText={"Filter by User"}
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
