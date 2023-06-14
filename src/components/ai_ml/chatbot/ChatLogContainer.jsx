import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Model from "../../../core/data_model/model";
import chatbotModel from "./chatbot-model";
import { faSearchPlus, faUser } from "@fortawesome/pro-solid-svg-icons";
import { Alert, Row } from "react-bootstrap";
import OpseraInfinityLogo from "../../logo/OpseraInfinityLogo";
import IconBase from "../../common/icons/IconBase";
import PropTypes from "prop-types";
import CenterLoadingIndicator from "../../common/loading/CenterLoadingIndicator";
import { screenContainerHeights } from "../../common/panels/general/screenContainer.heights";
import LoadingIcon from "../../common/icons/LoadingIcon";

function ChatLogContainer({ messages, connectionState, disabled, isLoading }) {
  const [chatModel, setChatModel] = useState(
    new Model({ ...chatbotModel.newObjectFields }, chatbotModel, true),
  );
  const endOfMessageContainer = useRef(null);
  const autoBottomScroll = () => {
    endOfMessageContainer.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    autoBottomScroll();
  }, [messages]);

  const getChatClass = (item) => {
    if (item?.user === "opsera" || item?.user === "loading") {
      return "chat-message opsera-ai";
    }
    return "chat-message user";
  };

  const getAvatar = (item) => {
    if (item?.user === "opsera") {
      return (
        <div>
          <OpseraInfinityLogo
            desiredHeight={"25px"}
            imageClassName={"my-auto"}
          />
        </div>
      );
    } else if (item?.user === "loading") {
      return (
        <LoadingIcon
          iconSize={"md"}
          className={"ml-2 mr-2 my-auto"}
        />
      );
    }
    return (
      <IconBase
        icon={faUser}
        iconClassName="mt-1"
        iconSize="md"
        iconStyling={{ alignItems: "flex-end" }}
      />
    );
  };

  const getIsLoading = () => {
    if (isLoading) {
      return <CenterLoadingIndicator customMessage={"Analyzing prompt..."} />;
    }
  };

  return (
    <div
      className={"chatarea"}
      style={{ minHeight: `90%` }}
    >
      {messages.map((item, idx) => (
        <div
          key={idx}
          className="chat-log"
        >
          <Row className="max-content-width">
            <Col lg={11}>
              <div className={getChatClass(item)}>
                <div className="chat-message-center">
                  <div className="row mb-1">{getAvatar(item)}</div>
                  <div className="row ml-4">{item?.message}</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ))}
      <div ref={endOfMessageContainer} />
    </div>
  );
}

ChatLogContainer.propTypes = {
  messages: PropTypes.array,
  connectionState: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ChatLogContainer;
