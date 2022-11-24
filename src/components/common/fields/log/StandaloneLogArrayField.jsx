import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function StandaloneLogArrayField(
  {
    title,
    logs,
    height,
    maxHeight,
  }) {
  const parsedLogs = DataParsingHelper.parseArray(logs, []);

  const getBody = () => {
    return (
      parsedLogs.map((log, index) => {
        return (
          <div key={index}>{log}</div>
        );
      })
    );
  };

  return (
    <InfoContainer
      className={"my-2"}
      titleText={title}
      titleIcon={faLaptopCode}
    >
      <div
        style={{
          minHeight: height,
          maxHeight: maxHeight,
          overflowY: "auto",
        }}
        className={"console-text"}
      >
        <div>
          {getBody()}
        </div>
      </div>
    </InfoContainer>
  );
}

StandaloneLogArrayField.propTypes = {
  logs: PropTypes.array,
  title: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
};

StandaloneLogArrayField.defaultProps = {
  title: "Logs",
  height: "500px",
  maxHeight: "500px",
};