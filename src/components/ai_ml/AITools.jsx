import React, { useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";
import FreeTrialAdminToolsPageLinkCards from "components/admin/FreeTrialAdminToolsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";
import AIToolsSubNavigationBar from "./AIToolsSubNavigationBar";
import AIToolsHelpDocumentation from "../common/help/documentation/ai_ml/AIToolsHelpDocumentaiton";
import OpseraAIInputBox from "./OpseraAIInputBox";
import ChatLogContainer from "./ChatLogContainer";

function AITools() {
  const { accessRoleData, toastContext, isOpseraAdministrator } =
    useComponentStateReference();

  useEffect(() => {}, []);

  const getHelpComponent = () => {
    return <AIToolsHelpDocumentation />;
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"ai"}
      helpComponent={getHelpComponent()}
      className="chatbox"
      navigationTabContainer={<AIToolsSubNavigationBar activeTab={"aiTools"} />}
    >
      <ChatLogContainer />
      <OpseraAIInputBox />
    </ScreenContainer>
  );
}

export default AITools;
