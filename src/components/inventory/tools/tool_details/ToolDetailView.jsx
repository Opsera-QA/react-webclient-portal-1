import React, {useState, useEffect, useContext, useRef} from "react";
import {useParams} from "react-router-dom";
import ToolDetailPanel from "components/inventory/tools/details/panel/ToolDetailPanel";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteToolButton from "components/common/actions/buttons/tool/ActionBarDeleteToolButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import ActionBarTransferToolButton from "components/common/actions/buttons/tool/ActionBarTransferToolButton";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import axios from "axios";
import ToolModel from "components/inventory/tools/tool.model";
import ToolDetailHelpDocumentation from "../../../common/help/documentation/tool_registry/ToolDetailHelpDocumentation";

function ToolDetailView() {
  const { id, tab } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolMetadata, setToolMetadata] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      setIsLoading(true);
      await getTool(cancelSource);
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTool = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, id);
    const tool = response?.data?.data;

    if (isMounted?.current === true && tool) {
      const metadata = response?.data?.metadata;
      const roleDefinitions = response?.data?.roles;
      const userRecord = await getUserRecord(); //RBAC Logic
      const customerAccessRules = await setAccessRoles(userRecord);
      const toolModel = new ToolModel(tool, metadata, false, getAccessToken, cancelTokenSource, loadData, customerAccessRules, roleDefinitions);
      setToolData(toolModel);
      setToolMetadata(metadata);
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/inventory/tools"} />
        </div>
        <div className="d-flex">
          <ActionBarTransferToolButton
            className={"ml-3"}
            toolModel={toolData}
            loadTool={getTool}
          />
          <ActionBarDeleteToolButton
            className={"ml-3"}
            toolModel={toolData}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getHelpComponent = () => {
    if (!isLoading) {
      return (
        <ToolDetailHelpDocumentation
          toolIdentifier={toolData?.getData("tool_identifier")}
        />
      );
    }
  };

  return (
    <DetailScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"toolViewer"} />}
      breadcrumbDestination={"toolDetailView"}
      metadata={toolMetadata}
      dataObject={toolData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      helpComponent={getHelpComponent()}
      detailPanel={
        <ToolDetailPanel
          toolData={toolData}
          isLoading={isLoading}
          tab={tab}
          setToolData={setToolData}
          loadData={getTool}
        />
      }
    />
  );
}

export default ToolDetailView;