import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import UserToolOwnershipReportTable from "components/reports/users/tools/UserToolOwnershipReportTable";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import toolsActions from "components/inventory/tools/tools-actions";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserToolOwnershipReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [toolFilterModel, setToolFilterModel] = useState(new ToolFilterModel());
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isAuditor,
    isSecurityManager,
    cancelTokenSource,
    getAccessToken,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const loadData = async (newFilterModel = toolFilterModel) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setTools([]);
          return;
        }

        setIsLoading(true);
        const response = await toolsActions.getRoleLimitedToolRegistryListV3(getAccessToken, cancelTokenSource, newFilterModel);
        const tools = response?.data?.data;

        if (Array.isArray(tools)) {
          setTools(tools);
          newFilterModel.setData("totalCount", response?.data?.count);
          newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
          setToolFilterModel({...newFilterModel});
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (
    isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isAuditor !== true
    && isSecurityManager !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolOwnershipReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"}/>}
      pageDescription={"View tools owned by a selected user"}
    >
      <Row className={"mx-0 mb-2"}>
        <Col className={"px-2"}>
          <OwnershipReportLdapUserSelectInput
            model={toolFilterModel}
            loadData={loadData}
          />
        </Col>
      </Row>
      <UserToolOwnershipReportTable
        paginationModel={toolFilterModel}
        setPaginationModel={setToolFilterModel}
        toolList={tools}
        loadData={loadData}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}

export default UserToolOwnershipReport;