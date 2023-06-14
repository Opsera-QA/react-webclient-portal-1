import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import chatbotActions from "./chatbot-actions";
import ChatLogContainer from "./ChatLogContainer";
import OpseraAIInputBox from "./OpseraAIInputBox";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import sessionHelper from "../../../utils/session.helper";
import useComponentStateReference from "../../../hooks/useComponentStateReference";
import ChatbotDisclaimer from "./disclaimer/ChatbotDisclaimer";

let MESSAGE_STACK = [
  {
    user: "opsera",
    message:
      "Welcome to the Opsera AI Playground. You may ask questions about your Opsera Devops landscape including data about SCM Operations and Jira Integration (if enabled in Opsera).",
  },
];

function ChatBotParentContainer() {
  const [messages, setMessages] = useState(MESSAGE_STACK);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [disable, setDisabled] = useState(false);
  const [connectionState, setConnectionState] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { toastContext } = useComponentStateReference();
  const [showDisclaimer, setShowDisclaimer] = useState(
    DataParsingHelper.parseBooleanV2(
      sessionHelper.getCookie(
        sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.AI_ML_DISCLAIMER,
      ),
      true,
    ),
  );

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
      // await checkChatBotConnection(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
    sessionHelper.setCookie(
      sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.AI_ML_DISCLAIMER,
      !showDisclaimer,
    );
    setShowDisclaimer(!showDisclaimer);
  };

  const showDisclaimerPanel = () => {
    if (showDisclaimer) {
      toastContext.showOverlayPanel(
        <ChatbotDisclaimer
          closePanel={closePanel}
          showPanel={showDisclaimer}
          title={"Opsera AI Tools"}
        />,
      );
    }
  };

  const checkChatBotConnection = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await chatbotActions.checkConnection(
        getAccessToken,
        cancelSource,
      );
      if (
        response?.status !== 200 ||
        response?.data?.connectionStatus !== 200 ||
        !response?.data ||
        !response?.data?.connectionStatus
      ) {
        setDisabled(true);
        setMessages([
          ...MESSAGE_STACK,
          {
            user: "opsera",
            message:
              "There has been an error communicating with the Opsera AI Service. Please refresh the page or check back later when communication with the service is restored.",
          },
        ]);
      }
      setConnectionState(
        response?.data?.connectionStatus == 200 ? true : false,
      );
    } catch (e) {
      setDisabled(true);
      setMessages([
        ...MESSAGE_STACK,
        {
          user: "opsera",
          message:
            "There has been an error communicating with the Opsera AI Service. Please refresh the page or check back later when communication with the service is restored.",
        },
      ]);
      setConnectionState(false);
    }
  };

  const updateMessage = async (messages, newMessage, addLoadingMessage = false) => {
    MESSAGE_STACK.push(newMessage);
    setMessages(MESSAGE_STACK);
    if (addLoadingMessage) {
      await isLoadingMessage(true);
    }
  };

  const isLoadingMessage = async (push) => {
    if (push) {
      MESSAGE_STACK.push({
        user: "loading",
        message: (
          <div
            style={{
              letterSpacing: "1px",
            }}
          >
            Loading Response...
          </div>
        ),
      });
      setMessages(MESSAGE_STACK);
      return;
    } else {
      MESSAGE_STACK = MESSAGE_STACK.filter(
        (message) => message?.user !== "loading",
      );
      setMessages(MESSAGE_STACK);
    }
  };

  const setErrorMessage = (e) => {
    MESSAGE_STACK.push({
      user: "opsera",
      message:
          "There was an error communicating with the Opsera ML service." +
          e ? JSON.stringify(e?.message) : "",
    });
    setMessages(MESSAGE_STACK);
  };

  const sendMessage = async (message, cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    await updateMessage(messages, {
      user: "user",
      message: message,
    }, true);
    try {
      const response = await chatbotActions.sendMessage(
        getAccessToken,
        cancelSource,
        message,
      );
      let ai_response = {};
      if (response.status === 200) {
        ai_response = response?.data?.data;
      }
      if (ai_response && ai_response?.text) {
        await updateMessage(messages, {
          user: "opsera",
          message: ai_response?.text,
        });
        setIsLoading(false);
        return;
      }
      await isLoadingMessage(false);
      await setErrorMessage();
      setIsLoading(false);
      return;
    } catch (e) {
      // if (isMounted?.current === true) {
      //   toastContext.showErrorDialog(e);
      // }
      await isLoadingMessage(false);
      await setErrorMessage(e);
    } finally {
      await isLoadingMessage(false);
      setIsLoading(false);
    }
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
          <OpseraAIInputBox
            isLoading={isLoading}
            disabled={disable}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default ChatBotParentContainer;
