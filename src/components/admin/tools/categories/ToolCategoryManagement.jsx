import React, {useEffect, useState} from "react";
import ToolCategoryTable from "components/admin/tools/categories/ToolCategoryTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolCategoryManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [toolTypes, setToolTypes] = useState([]);
  const {
    getAccessToken,
    accessRoleData,
    isOpseraAdministrator,
    toastContext,
    isMounted,
    cancelTokenSource,
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
      setIsLoading(true);
      await getToolTypes();
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolTypes = async () => {
    try {
      const response = await toolCategoryActions.getToolTypesV2(getAccessToken, cancelTokenSource, true);
      const toolTypes = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(toolTypes)) {
        setToolTypes(toolTypes);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      accessRoleData={accessRoleData}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"categories"} />}
      breadcrumbDestination={"toolManagement"}
    >
      <ToolCategoryTable
        data={toolTypes}
        isLoading={isLoading}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

ToolCategoryManagement.propTypes = {};

export default ToolCategoryManagement;