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
import { platformSystemParametersMetadata } from "components/admin/system_parameters/platformSystemParameters.metadata";
import PlatformSystemParameterManagementSubNavigationBar
  from "components/admin/system_parameters/PlatformSystemParameterManagementSubNavigationBar";
import PlatformSystemParameterDetailPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterDetailPanel";

export default function PlatformSystemParameterDetailView() {
  const { systemParameterId } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [platformSystemParameterModel, setPlatformSystemParameterModel] = useState(undefined);
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
      await getSystemParameter();
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

  const getSystemParameter = async () => {
    const response = await platformSystemParameterActions.getPlatformSystemParameterById(
      getAccessToken,
      cancelTokenSource,
      systemParameterId,
    );

    const systemParameter = response?.data?.data;
    if (isMounted?.current === true && systemParameter) {
      setPlatformSystemParameterModel({ ...modelHelpers.parseObjectIntoModel(systemParameter, platformSystemParametersMetadata) });
    }
  };

  const getActionBar = () => {
    if (platformSystemParameterModel == null) {
      return <></>;
    }

    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/platform/system-parameters"} />
        </div>
        <div className={"d-flex"}>
          <ActionBarShowJsonButton dataObject={platformSystemParameterModel} />
          <ActionBarDeleteButton2
            relocationPath={"/admin/platform/system-parameters"}
            dataObject={platformSystemParameterModel}
            handleDelete={deleteTemplate}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const deleteTemplate = async () => {
    return await platformSystemParameterActions.deletePlatformSystemParameter(
      getAccessToken,
      cancelTokenSource,
      platformSystemParameterModel,
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"platformSystemParameterDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={platformSystemParameterModel}
      isLoading={isLoading}
      metadata={platformSystemParametersMetadata}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PlatformSystemParameterManagementSubNavigationBar
          activeTab={"platformSystemParameterViewer"}
        />
      }
      detailPanel={
        <PlatformSystemParameterDetailPanel
          setPlatformSystemParameterModel={setPlatformSystemParameterModel}
          platformSystemParameterModel={platformSystemParameterModel}
        />
      }
    />
  );
}