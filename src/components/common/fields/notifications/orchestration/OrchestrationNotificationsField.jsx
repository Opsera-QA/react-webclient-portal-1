import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import OrchestrationNotificationSettingsDisplayer
  from "components/common/fields/notifications/orchestration/displayer/OrchestrationNotificationSettingsDisplayer";

function OrchestrationNotificationsField({model, fieldName, noDataMessage, className}) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <OrchestrationNotificationSettingsDisplayer
        notifications={model?.getArrayData(fieldName)}
        noDataMessage={noDataMessage}
      />
    </FieldContainer>
  );
}

OrchestrationNotificationsField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

export default OrchestrationNotificationsField;