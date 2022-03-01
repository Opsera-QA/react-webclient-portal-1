import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";

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
      return <span><LoadingIcon className={"mr-1"}/>{dataObject.getData(fieldName)}</span>;
    }

    if (priority) {
      return priority;
    }

    return `Priority field could not be found with ID: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
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