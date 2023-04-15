import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ToolIdentifierDetailPanel
  from "components/admin/tools/identifiers/details/ToolIdentifierDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import ActionBarOpseraAdminDeleteButton from "components/common/actions/buttons/ActionBarOpseraAdminDeleteButton";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolIdentifierDetailView() {
  const {toolIdentifierId} = useParams();
  const [toolIdentifierData, setToolIdentifierData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getAccessToken,
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
      setToolIdentifierData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getToolIdentifier();
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolIdentifier = async () => {
    const response = await toolIdentifierActions.getToolIdentifierByIdV2(getAccessToken, cancelTokenSource, toolIdentifierId);
    const toolIdentifier = response?.data?.data;

    if (isMounted?.current === true && toolIdentifier) {
      setToolIdentifierData(new Model(toolIdentifier, toolIdentifierMetadata, false));
    }
  };

  const deleteToolIdentifier = async () => {
    return await toolIdentifierActions.deleteToolIdentifierV2(
      getAccessToken,
      cancelTokenSource,
      toolIdentifierId,
      );
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/tools/identifiers"} />
        </div>
        <div>
          <ActionBarOpseraAdminDeleteButton
            relocationPath={"/admin/tools/identifiers"}
            handleDelete={deleteToolIdentifier}
            dataObject={toolIdentifierData}
          />
        </div>
      </ActionBarContainer>
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolIdentifierDetailView"}
      metadata={toolIdentifierMetadata}
      dataObject={toolIdentifierData}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"toolIdentifierViewer"} />}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolIdentifierDetailPanel toolIdentifierData={toolIdentifierData} setToolIdentifierData={setToolIdentifierData}/>}
    />
  );
}

export default ToolIdentifierDetailView;