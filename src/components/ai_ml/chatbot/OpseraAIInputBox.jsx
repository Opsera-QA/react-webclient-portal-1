import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Model from "../../../core/data_model/model";
import chatbotModel from "./chatbot-model";
import TextInputBase from "../../common/inputs/text/TextInputBase";
import {
  faMagnifyingGlassArrowRight,
  faSpinner,
} from "@fortawesome/pro-light-svg-icons";
import ButtonBase from "../../common/buttons/ButtonBase";
import PropTypes from "prop-types";
import CenterLoadingIndicator from "../../common/loading/CenterLoadingIndicator";
import { Form } from "react-bootstrap";

function OpseraAIInputBox({ sendMessage, isLoading, disabled }) {
  const [chatModel, setChatModel] = useState(
    new Model({ ...chatbotModel.newObjectFields }, chatbotModel, true),
  );

  useEffect(() => {}, []);

  const processMessage = (e) => {
    e.preventDefault();
    sendMessage(chatModel?.getData("question"));
    let newModel = chatModel;
    newModel.setDefaultValue("question");
    setChatModel({ ...newModel });
  };

  return (
    <div className="chat-input-holder">
      <Col lg={12}>
        <Form onSubmit={processMessage}>
          <TextInputBase
            showLabel={false}
            placeholderText={"How can Opsera AI Help you today?"}
            className="chat-input-textarea"
            fieldName={"question"}
            dataObject={chatModel}
            setDataObject={setChatModel}
            disabled={isLoading}
            rightSideInputButton={
              <ButtonBase
                disabled={
                  isLoading ||
                  !chatModel?.getData("question") ||
                  chatModel?.getData("question")?.length === 0
                }
                onClickFunction={processMessage}
                variant={"primary"}
                isLoading={false}
                icon={isLoading ? faSpinner : faMagnifyingGlassArrowRight}
              />
            }
          />
        </Form>
      </Col>
    </div>
  );
}

OpseraAIInputBox.propTypes = {
  sendMessage: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default OpseraAIInputBox;
