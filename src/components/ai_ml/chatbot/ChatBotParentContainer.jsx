import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import chatbotActions from "./chatbot-actions";
import CenterLoadingIndicator from "../../common/loading/CenterLoadingIndicator";
import ChatLogContainer from "./ChatLogContainer";
import OpseraAIInputBox from "./OpseraAIInputBox";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import sessionHelper from "../../../utils/session.helper";
import CreateLdapOrganizationOverlay from "../../admin/accounts/ldap/organizations/CreateLdapOrganizationOverlay";
import useComponentStateReference from "../../../hooks/useComponentStateReference";
import ChatbotDisclaimer from "./disclaimer/ChatbotDisclaimer";

const MESSAGE_CONSTANT = [
  {
    user: "opsera",
    message:
      "Welcome to the Opsera AI Playground. You may ask questions about your Opsera Devops landscape including data about SCM Operations and Jira Integration (if enabled in Opsera).",
  }
];

function ChatBotParentContainer() {
  const [messages, setMessages] = useState(MESSAGE_CONSTANT);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [disable, setDisabled] = useState(false);
  const [connectionState, setConnectionState] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();
  const [showDisclaimer, setShowDisclaimer] = useState(DataParsingHelper.parseBooleanV2(sessionHelper.getCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.AI_ML_DISCLAIMER), true));


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setError(undefined);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    showDisclaimerPanel();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await checkChatBotConnection(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
    sessionHelper.setCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.AI_ML_DISCLAIMER, !showDisclaimer);
  };

  const showDisclaimerPanel = () => {
    toastContext.showOverlayPanel(
        <ChatbotDisclaimer
            closePanel={closePanel}
            showPanel={showDisclaimer}
            title={"Opsera AI Tools"}
        />
    );
  };

  const checkChatBotConnection = async (cancelSource = cancelTokenSource) => {
    const response = await chatbotActions.checkConnection(
      getAccessToken,
      cancelSource,
    );
    if (response?.data?.connectionStatus !== 200) {
      setDisabled(true);
      setMessages([
        ...MESSAGE_CONSTANT,
        {
          user: "opsera",
          message:
            "There has been an error communicating with the Opsera AI Service. Please refresh the page or check back later when communication with the service is restored.",
        },
      ]);
    }
    setConnectionState(response?.data?.connectionStatus == 200 ? true : false);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    setMessages([
      ...messages,
      {
        user: "user",
        message:
            message
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <div className="shaded-panel chatbox-panel-body">
          <div className="p-1">
            <ChatLogContainer
              messages={messages}
              connectionState={connectionState}
              disabled={disable}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div>
          <OpseraAIInputBox isLoading={isLoading} disabled={disable} sendMessage={sendMessage}/>
        </div>
      </div>
    </>
  );
}

export default ChatBotParentContainer;
