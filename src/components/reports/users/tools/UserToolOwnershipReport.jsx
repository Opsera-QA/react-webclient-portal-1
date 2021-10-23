import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import UserToolOwnershipReportTable from "components/reports/users/tools/UserToolOwnershipReportTable";
import axios from "axios";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import toolsActions from "components/inventory/tools/tools-actions";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";

function UserToolOwnershipReport() {
  const { getAccessRoleData, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [toolFilterModel, setToolFilterModel] = useState(new ToolFilterModel());

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

  const loadData = async (newFilterModel = toolFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setTools([]);
          return;
        }

        setIsLoading(true);
        const response = await toolsActions.getRoleLimitedToolRegistryListV3(getAccessToken, cancelSource, newFilterModel);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"toolOwnershipReport"}
      accessRoleData={accessRoleData}
      isLoading={!accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"}/>}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
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