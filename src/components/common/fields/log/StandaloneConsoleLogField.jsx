import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";

function StandaloneConsoleLogField({title, consoleLog}) {

  useEffect(() => {
  }, [consoleLog]);

  return (
    <InfoContainer
      className={"my-2"}
      titleText={title}
      titleIcon={faLaptopCode}
    >
      <div style={{ height: "500px", maxHeight: "500px", overflowY: "auto" }} className={"console-text"}>
        <div>
          {consoleLog}
        </div>
      </div>
      <div className={"object-properties-footer"} />
    </InfoContainer>
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