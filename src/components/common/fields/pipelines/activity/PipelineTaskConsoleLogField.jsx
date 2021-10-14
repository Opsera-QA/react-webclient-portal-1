import React, {useState} from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";

function PipelineTaskConsoleLogField({fieldName, dataObject}) {
  // TODO: Replace with Model Wrapped Object
  const [apiResponse] = useState(dataObject[fieldName]);

  const parseObject = (object, topLevel) => {
    const parsedArray = [];
    const objectKeys = Object.keys(object);

    if (Array.isArray(objectKeys) && objectKeys.length > 0) {
      for (const key of objectKeys) {
        parsedArray.push(parseData(object[key], topLevel));
      }
    }

    return parsedArray;
  };

  const parseData = (data, topLevel) => {
    if (typeof data === "string") {
      return (
        <div className="console-text my-3">
          {data}
        </div>
      );
    }

    if (typeof data === "object") {
      if (topLevel === true) {
        return (
          <div className="my-3">
            {parseObject(data)}
          </div>
        );
      }

      return (
        <div className={"my-3"}>
          {parseObject(data)}
        </div>
      );
    }

    // Fallback
    return (
      <div className="console-text my-3">
        {JSON.stringify(data)}
      </div>
    );
  };

  const getBody = () => {
    if (typeof (apiResponse) === "string") {
      return (
        <div className="console-text my-3">
          {apiResponse}
        </div>
      );
    }

    return (
      <div className="my-3">
        {parseObject(apiResponse, true).map((row, key) => {
          return (
            <div key={key}>
              {row}
            </div>
          );
        })
        }
      </div>
    );
  };


  return (
    <div>
      <div className="m-2">
        <div className="float-right mr-2">
          <span>{format(new Date(dataObject.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span>
        </div>
        <span><span className="text-muted ml-2">Step: </span> {dataObject.step_name}</span>
      </div>
      {getBody()}
    </div>
  );
}

PipelineTaskConsoleLogField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

PipelineTaskConsoleLogField.defaultProps = {
  fieldName: "api_response"
};

export default PipelineTaskConsoleLogField;