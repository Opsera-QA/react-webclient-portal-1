import React, {useState} from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";

function PipelineTaskConsoleLogField({fieldName, dataObject}) {
  // TODO: Replace with Model Wrapped Object
  const [apiResponse] = useState(dataObject[fieldName]);

  const getBody = () => {
    if (typeof (apiResponse) === "string") {
      return (
        <div className="console-text m-3">
          {apiResponse}
        </div>
      );
    }

    return (
      <div className="m-3">
        {Object.keys(apiResponse).map((row, key) => {
          return <div key={key} className="console-text mb-1">
            {typeof (apiResponse[row]) === "string" ?
              apiResponse[row] :
              <div className="m-3">{JSON.stringify(apiResponse[row])}</div>
            }
          </div>;
        })}

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