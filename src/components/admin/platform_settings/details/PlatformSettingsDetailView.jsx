import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DialogToastContext } from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import { platformSystemParameterActions } from "components/admin/system_parameters/platformSystemParameter.actions";
import PlatformSystemParameterManagementSubNavigationBar
  from "components/admin/system_parameters/PlatformSystemParameterManagementSubNavigationBar";
import PlatformSystemParameterDetailPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterDetailPanel";
import { platformSettingsActions } from "components/admin/platform_settings/platformSettings.actions";
import { platformSettingsMetadata } from "components/admin/platform_settings/platformSettings.metadata";
import PlatformSettingsManagementSubNavigationBar
  from "components/admin/platform_settings/PlatformSettingsManagementSubNavigationBar";
import PlatformSettingsDetailPanel from "components/admin/platform_settings/details/PlatformSettingsDetailPanel";

export default function PlatformSettingsDetailView() {
  const { settingsId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [platformSettingsModel, setPlatformSettingsModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
    accessRoleData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [isOpseraAdministrator]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPlatformSettingsRecord();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPlatformSettingsRecord = async () => {
    const response = await platformSettingsActions.getPlatformSettingRecordById(
      getAccessToken,
      cancelTokenSource,
      settingsId,
    );

    const systemParameter = response?.data?.data;
    if (isMounted?.current === true && systemParameter) {
      setPlatformSettingsModel({ ...modelHelpers.parseObjectIntoModel(systemParameter, platformSettingsMetadata) });
    }
  };

  const getActionBar = () => {
    if (platformSettingsModel == null) {
      return <></>;
    }

    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/platform/system-parameters"} />
        </div>
        <div className={"d-flex"}>
          <ActionBarShowJsonButton dataObject={platformSettingsModel} />
          <ActionBarDeleteButton2
            relocationPath={"/admin/platform/system-parameters"}
            dataObject={platformSettingsModel}
            handleDelete={deletePlatformSettingsRecord}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const deletePlatformSettingsRecord = async () => {
    return await platformSettingsActions.deletePlatformSystemParameter(
      getAccessToken,
      cancelTokenSource,
      platformSettingsModel,
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"platformSettingsDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={platformSettingsModel}
      isLoading={isLoading}
      metadata={platformSettingsMetadata}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PlatformSettingsManagementSubNavigationBar
          activeTab={"platformSettingsViewer"}
        />
      }
      detailPanel={
        <PlatformSettingsDetailPanel
          platformSettingsModel={platformSettingsModel}
          setPlatformSettingsModel={setPlatformSettingsModel}
        />
      }
    />
  );
}