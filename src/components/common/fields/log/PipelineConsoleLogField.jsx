import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import StandaloneConsoleLogsDisplayer from "components/common/fields/log/StandaloneConsoleLogsDisplayer";
import {getFormattedTimestamp} from "components/common/fields/date/DateFieldBase";

// TODO: This needs to be tailored to Pipeline Field
function PipelineConsoleLogField({dataObject, apiResponse}) {
  const isMounted = useRef(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [parsedLogs, setParsedLogs] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setConsoleLogs([]);
    setParsedLogs([]);
    const newParsedLogs = unpackLogs(apiResponse);

    if (Array.isArray(newParsedLogs) && newParsedLogs.length > 0) {
      setParsedLogs(newParsedLogs);
    }

    return () => {
      isMounted.current = false;
    };
  }, [apiResponse]);

  const parseObject = (object) => {
    const parsedArray = [];
    const objectKeys = Object.keys(object);

    if (Array.isArray(objectKeys) && objectKeys.length > 0) {
      for (const key of objectKeys) {
        const parsedObject = parseData(object[key], key);

        if (parsedObject != null) {
          parsedArray.push(parseData(object[key], key));
        }
      }
    }

    return parsedArray;
  };

  const parseInnerObject = (innerObject) => {
    const parsedArray = [];
    const objectKeys = Object.keys(innerObject);

    if (Array.isArray(objectKeys) && objectKeys.length > 0) {
      for (const key of objectKeys) {
        const object = innerObject[key];
        parsedArray.push(object);
      }
    }

    return parsedArray;
  };

  const parseData = (data, key) => {
    if (key === "consoleLog") {
      if (typeof data === "object") {
        const parsedArray = parseInnerObject(data);

        if (Array.isArray(parsedArray)) {
          setConsoleLogs(parsedArray);
        }
      }

      if (typeof data === "string") {
        setConsoleLogs([data]);
      }
      return;
    }

    if (typeof data === "string") {
      return (data);
    }

    if (typeof data === "object") {
      return (parseObject(data));
    }

    // Fallback
    return (JSON.stringify(data));
  };

  const unpackLogs = (apiResponse) => {
    if (typeof (apiResponse) === "string") {
      return (
        [apiResponse]
      );
    }

    const unpackedLogs = parseObject(apiResponse);
    if (Array.isArray(unpackedLogs) && unpackedLogs.length > 0) {
      return unpackedLogs;
    }

    return [];
  };

  const getBody = () => {
    if (Array.isArray(parsedLogs) && parsedLogs.length > 0) {
      return (
        parsedLogs.map((row, key) => {
          return (
            <div key={key} className="console-text my-3">
              {row}
            </div>
          );
        })
      );
    }
  };

  return (
    <div>
      <div className="m-2">
        <div className="float-right mr-2">
          <span>{getFormattedTimestamp(dataObject?.createdAt)}</span>
        </div>
        <span><span className="text-muted ml-2">Step: </span> {dataObject?.step_name}</span>
      </div>
      <div className={"my-2"}>
        {getBody()}
      </div>
      <div className={"my-2"}>
        <StandaloneConsoleLogsDisplayer
          consoleLogs={consoleLogs}
        />
      </div>
    </div>
  );
}

PipelineConsoleLogField.propTypes = {
  apiResponse: PropTypes.any,
  dataObject: PropTypes.object,
};

export default PipelineConsoleLogField;