import React, {useEffect} from "react";
import ToolIdentifierTableCardView from "components/admin/tools/identifiers/ToolIdentifierTableCardView";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetToolIdentifiers from "components/admin/tools/identifiers/hooks/useGetToolIdentifiers";

export default function ToolIdentifierManagement() {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
    toolIdentifiers,
    toolIdentifierFilterModel,
    setToolIdentifierFilterModel,
  } = useGetToolIdentifiers();

  useEffect(() => {}, []);

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"identifiers"}/>}
      breadcrumbDestination={"toolManagement"}
    >
      <ToolIdentifierTableCardView
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
        toolIdentifierFilterModel={toolIdentifierFilterModel}
        setToolIdentifierFilterModel={setToolIdentifierFilterModel}
        error={error}
      />
    </ScreenContainer>
  );
}

ToolIdentifierManagement.propTypes = {};
