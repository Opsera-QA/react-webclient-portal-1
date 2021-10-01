import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import PropTypes from "prop-types";
import axios from "axios";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import ToolIdentifierTableCardView from "components/admin/tools/tool_identifier/ToolIdentifierTableCardView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";

function ToolIdentifierManagement() {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [toolIdentifierFilterModel, setToolIdentifierFilterModel] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      const newAccessRoleData = await getAccessRoleData();
      setAccessRoleData(newAccessRoleData);
      await getToolIdentifiers(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getToolIdentifiers = async (cancelSource) => {
    try {
      const toolIdentifierResponse = await toolManagementActions.getToolIdentifiersV2(getAccessToken, cancelSource);

      if (isMounted?.current === true) {
        setToolIdentifiers(toolIdentifierResponse?.data);
      }
    } catch (error) {

      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  return (
    <ScreenContainer
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      isLoading={!accessRoleData || isLoading}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"identifiers"}/>}
      breadcrumbDestination={"toolManagement"}
    >
      <ToolIdentifierTableCardView
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
        toolIdentifierFilterModel={toolIdentifierFilterModel}
        setToolIdentifierFilterModel={setToolIdentifierFilterModel}
      />
    </ScreenContainer>
  );
}

ToolIdentifierManagement.propTypes = {
  customerAccessRules: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default ToolIdentifierManagement;