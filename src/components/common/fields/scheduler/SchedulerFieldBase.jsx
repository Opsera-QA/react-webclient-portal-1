import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import IconBase from "components/common/icons/IconBase";
import {faBinoculars, faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import FieldLabel from "components/common/fields/FieldLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import LoadingIcon from "components/common/icons/LoadingIcon";

function SchedulerFieldBase(
  {
    model,
    canEdit,
    scheduledTaskCount,
    fieldName,
    showSchedulerOverlayFunction,
    error,
    isLoading,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getTaskCountText = () => {
    if (isLoading === true) {
      return (
        <span>
          <LoadingIcon className={"mr-2"} />
          <span>Loading Scheduled Task Count</span>
        </span>
      );
    }

    if (scheduledTaskCount === 0) {
      return "No scheduled tasks";
    }

    const taskLabel = scheduledTaskCount === 1 ? "task" : "tasks";

    return `${scheduledTaskCount} ${taskLabel} scheduled`;
  };

  const getScheduleIcon = () => {
    if (canEdit !== true || showSchedulerOverlayFunction == null || isLoading === true) {
      return null;
    }

    if (scheduledTaskCount > 0){
      return (
        <IconBase
          icon={faBinoculars}
          className={"ml-2 text-muted pointer"}
          iconSize={"sm"}
          onClickFunction={showSchedulerOverlayFunction}
        />
      );
    }

    return (
      <IconBase
        icon={faPencilAlt}
        className={"ml-2 text-muted pointer"}
        iconSize={"xs"}
        iconTransformProperties={"shrink-6"}
        onClickFunction={showSchedulerOverlayFunction}
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer>
      <FieldLabel
        field={field}
        fieldName={fieldName}
      />
      {getTaskCountText()}
      {getScheduleIcon()}
      <InfoText
        fieldName={fieldName}
        field={field}
        errorMessage={error}
      />
    </FieldContainer>
  );
}

SchedulerFieldBase.propTypes = {
  canEdit: PropTypes.bool,
  model: PropTypes.object,
  fieldName: PropTypes.string,
  showSchedulerOverlayFunction: PropTypes.func,
  scheduledTaskCount: PropTypes.number,
  error: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default SchedulerFieldBase;