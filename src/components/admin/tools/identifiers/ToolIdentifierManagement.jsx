import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import ToolIdentifierTableCardView from "components/admin/tools/identifiers/ToolIdentifierTableCardView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolIdentifierManagement() {
  const [isLoading, setLoading] = useState(false);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [toolIdentifierFilterModel, setToolIdentifierFilterModel] = useState(new ToolFilterModel());
  const {
    accessRoleData,
    toastContext,
    getAccessToken,
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      if (isOpseraAdministrator !== true) {
        return;
      }

      setLoading(true);
      await getToolIdentifiers();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getToolIdentifiers = async () => {
    const response = await toolIdentifierActions.getToolIdentifiersV2(getAccessToken, cancelTokenSource);
    const identifiers = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(identifiers)) {
      setToolIdentifiers(identifiers);
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

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