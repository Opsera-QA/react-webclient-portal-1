import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Model from "../../core/data_model/model";
import chatbotModel from "./chatbot-model";
import { faUser} from "@fortawesome/pro-solid-svg-icons";
import ButtonBase from "../common/buttons/ButtonBase";
import {Row} from "react-bootstrap";
import OpseraInfinityLogo from "../logo/OpseraInfinityLogo";
import IconBase from "../common/icons/IconBase";

function ChatLogContainer() {
  const [chatModel, setChatModel] = useState(
    new Model({ ...chatbotModel.newObjectFields }, chatbotModel, true),
  );

  useEffect(() => {}, []);

  return (
    <div className="chat-log">
      <Row className="max-charting-width">
        <Col lg={12}>
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar"><IconBase icon={faUser} /></div>
              <div className="message">Hello World</div>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="chat-message opsera-ai">
            <div className="chat-message-center">
                <OpseraInfinityLogo
                  desiredHeight={"25px"}
                  imageClassName={"my-auto"}
              />
              <div className="message">This is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AIThis is Opsera AI</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatLogContainer;
