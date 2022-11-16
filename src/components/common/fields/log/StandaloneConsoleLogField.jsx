import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";

function StandaloneConsoleLogField(
  {
    title,
    consoleLog,
    height,
    maxHeight,
  }) {

  useEffect(() => {
  }, [consoleLog]);

  return (
    <InfoContainer
      className={"my-2"}
      titleText={title}
      titleIcon={faLaptopCode}
    >
      <div
        style={{
          height: height,
          maxHeight: maxHeight,
          overflowY: "auto",
        }}
        className={"console-text"}
      >
        <div>
          {consoleLog}
        </div>
      </div>
    </InfoContainer>
  );
}

StandaloneConsoleLogField.propTypes = {
  consoleLog: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  title: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
};

StandaloneConsoleLogField.defaultProps = {
  title: "Console Log",
  height: "500px",
  maxHeight: "500px",
};

export default StandaloneConsoleLogField;