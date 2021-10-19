import React, {useEffect} from "react";
import PropTypes from "prop-types";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import InputContainer from "components/common/inputs/InputContainer";

function StandaloneConsoleLogField({title, consoleLog}) {

  useEffect(() => {
  }, [consoleLog]);

  return (
    <InputContainer>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar customTitle={title} icon={faLaptopCode}/>
          <div style={{height: "500px", maxHeight: "500px", overflowY: "auto"}}>
            <div className="console-text">
              {consoleLog}
            </div>
          </div>
        </div>
      </div>
      <div className={"object-properties-footer"}/>
    </InputContainer>
  );
}

StandaloneConsoleLogField.propTypes = {
  consoleLog: PropTypes.string,
  title: PropTypes.string,
};

StandaloneConsoleLogField.defaultProps = {
  title: "Console Log",
};

export default StandaloneConsoleLogField;