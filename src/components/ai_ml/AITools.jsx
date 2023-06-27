import React, { useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";
import FreeTrialAdminToolsPageLinkCards from "components/admin/FreeTrialAdminToolsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";
import AIToolsSubNavigationBar from "./AIToolsSubNavigationBar";
import AIToolsHelpDocumentation from "../common/help/documentation/ai_ml/AIToolsHelpDocumentaiton";
import OpseraAIInputBox from "./chatbot/OpseraAIInputBox";
import ChatLogContainer from "./chatbot/ChatLogContainer";
import ChatBotParentContainer from "./chatbot/ChatBotParentContainer";

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
      <ChatBotParentContainer />
    </ScreenContainer>
  );
}

export default AITools;
