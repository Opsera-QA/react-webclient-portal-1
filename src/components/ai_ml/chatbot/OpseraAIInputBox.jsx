import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Model from "../../../core/data_model/model";
import chatbotModel from "./chatbot-model";
import TextInputBase from "../../common/inputs/text/TextInputBase";
import { faMagnifyingGlassArrowRight } from "@fortawesome/pro-light-svg-icons";
import ButtonBase from "../../common/buttons/ButtonBase";

function OpseraAIInputBox() {
  const [chatModel, setChatModel] = useState(
    new Model({ ...chatbotModel.newObjectFields }, chatbotModel, true),
  );

  useEffect(() => {}, []);

  return (
    <div className="chat-input-holder">
      <Col lg={12}>
        <TextInputBase
          showLabel={false}
          placeholderText={"How can Opsera AI Help you today?"}
          className="chat-input-textarea"
          fieldName={"question"}
          dataObject={chatModel}
          setDataObject={setChatModel}
          rightSideInputButton={
            <ButtonBase
              // size={"sm"}
              onClickFunction={() => console.log("hello")}
              variant={"primary"}
              isLoading={false}
              icon={faMagnifyingGlassArrowRight}
            />
          }
        />
      </Col>
    </div>
  );
}

export default OpseraAIInputBox;
