import React, { useState } from "react";
import UserPipelineOwnershipReportTable from "components/reports/users/pipelines/UserPipelineOwnershipReportTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import reportsFilterMetadata from "components/reports/reports-filter-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserPipelineOwnershipReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [pipelines, setPipelines] = useState([]);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(new Model({ ...reportsFilterMetadata.newObjectFields }, reportsFilterMetadata, false));
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

  const loadData = async (newFilterModel = pipelineFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setPipelines([]);
          return;
        }

        setIsLoading(true);
        const pipelineFields = ["type", "_id", "name", "owner", "workflow.last_step", "workflow.run_count", "createdAt", "updatedAt"];
        const response = await pipelineActions.getPipelinesV2(getAccessToken, cancelSource, newFilterModel, undefined, pipelineFields);
        const pipelines = response?.data?.data;

        if (Array.isArray(response?.data?.data)) {
          setPipelines(pipelines);
          newFilterModel.setData("totalCount", response?.data?.count);
          newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
          setPipelineFilterModel({...newFilterModel});
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
      breadcrumbDestination={"pipelineOwnershipReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      pageDescription={"View pipelines owned by selected user"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <OwnershipReportLdapUserSelectInput
            model={pipelineFilterModel}
            loadData={loadData}
          />
        </Col>
      </Row>
      <UserPipelineOwnershipReportTable
        pipelineList={pipelines}
        setPaginationModel={setPipelineFilterModel}
        paginationModel={pipelineFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    </ScreenContainer>
  );
}

export default UserPipelineOwnershipReport;