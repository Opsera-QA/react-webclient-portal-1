import React, { useContext, useState, useEffect, useRef } from "react";
import UserPipelineOwnershipReportTable from "components/reports/users/pipelines/UserPipelineOwnershipReportTable";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import reportsFilterMetadata from "components/reports/reports-filter-metadata";

function UserPipelineOwnershipReport() {
  const { getAccessRoleData, getAccessToken } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [pipelines, setPipelines] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(new Model({ ...reportsFilterMetadata.newObjectFields }, reportsFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadRoles().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const loadData = async (newFilterModel = pipelineFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setPipelines([]);
          return;
        }

        setIsLoading(true);
        const pipelineFields = ["type", "_id", "name", "workflow.last_step", "workflow.run_count", "createdAt", "updatedAt"];
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

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelineOwnershipReport"}
      accessRoleData={accessRoleData}
      isLoading={!accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
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