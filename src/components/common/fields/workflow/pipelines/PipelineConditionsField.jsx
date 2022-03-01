import React, {useState} from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import {getConditionLabel} from "components/common/list_of_values_input/workflow/pipelines/conditional_operation/PipelineConditionMultiSelectInput";
import IconBase from "components/common/icons/IconBase";

function PipelineConditionsField({ dataObject, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getConditions = () => {
    let conditions = dataObject?.getData(fieldName);
    if (conditions == null || conditions.length === 0) {
      return "No conditions assigned.";
    }

    return (
        <ul className="list-group content-block-body">
        {conditions.map((condition, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <label className="mx-2 mt-1"><span>{getConditionLabel(condition.type)}:</span></label>
              <span>{`${condition.value}`}</span>
            </div>
          );
        })}
        </ul>
    );
  };

  return (
    <div className="content-container content-card-1 ">
      <div className="px-2 content-block-header members-title">
        <span><IconBase icon={faCogs} className={"mr-2"}/>{field.label}</span>
      </div>
      <div>
        {getConditions()}
      </div>
      <div className="content-block-footer"/>
    </div>
  );
}

PipelineConditionsField.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string
};

export default PipelineConditionsField;