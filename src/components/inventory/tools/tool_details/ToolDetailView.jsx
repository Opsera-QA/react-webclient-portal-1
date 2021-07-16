import React, { useState, useEffect, useContext } from "react";
import {useHistory, useParams} from "react-router-dom";
import ToolDetailPanel from "./ToolDetailPanel";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolMetadata from "components/inventory/tools/tool-metadata";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteToolButton from "components/common/actions/buttons/tool/ActionBarDeleteToolButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import ActionBarTransferToolButton from "components/common/actions/buttons/tool/ActionBarTransferToolButton";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";

function ToolDetailView() {
  const { id, tab } = useParams();
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTool();
  }, []);

  const getTool = async () => {
    try {
      setIsLoading(true);
      const response = await toolsActions.getRoleLimitedToolById(id, getAccessToken);

      if (response?.data?.data) {
        setToolData(new Model(response.data.data[0], toolMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "tools":
        history.push(`/inventory/tools`);
        return;
      case "platform":
        history.push(`/inventory/platform`);
        return;
      case "parameters":
        history.push(`/inventory/parameters`);
        return;
      case "scripts":
        history.push(`/inventory/scripts`);
        return;
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={"toolViewer"} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={"toolViewer"} tabText={"Platform"} />
        <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={"toolViewer"} tabText={"Parameters"} />
        <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"toolViewer"} tabText={"Scripts"} />
        <NavigationTab icon={faTools} tabName={"toolViewer"} handleTabClick={handleTabClick} activeTab={"toolViewer"} tabText={"Tool Viewer"} />
      </NavigationTabContainer>
    );
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/inventory/tools"} />
        </div>
        <div className="d-flex">
          <ActionBarTransferToolButton className={"mr-3"} toolData={toolData} loadTool={getTool} toolDataObject={toolData} />
          <ActionBarDeleteToolButton status={toolData?.getData("active")} toolDataObject={toolData} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"toolDetailView"}
      metadata={toolMetadata}
      dataObject={toolData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolDetailPanel toolData={toolData} isLoading={isLoading} tab={tab} setToolData={setToolData} loadData={getTool}/>}
    />
  );
}

export default ToolDetailView;