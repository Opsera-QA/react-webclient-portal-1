import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import Label from "components/common/form_fields/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function JiraPriorityField({ dataObject, jiraToolId, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadPriorityName();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPriorityName = async () => {
    const jiraPriorityId = dataObject.getData(fieldName);
    if (jiraToolId !== "" && jiraPriorityId !== "") {
      const response = await pipelineStepNotificationActions.getJiraPrioritiesWithId(jiraToolId, getAccessToken);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        const jiraPriority = jiraArray.find((priority) => priority.id === jiraPriorityId);

        if (jiraPriority != null) {
          setPriority(jiraPriority.name);
        }
      }
    }
  };

  const getPriorityName = () => {
    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (priority) {
      return priority;
    }

    return `Priority field could not be found with ID: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <Label field={field}/>
      <span>{getPriorityName()}</span>
    </FieldContainer>
  );
}

JiraPriorityField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string
};

export default JiraPriorityField;