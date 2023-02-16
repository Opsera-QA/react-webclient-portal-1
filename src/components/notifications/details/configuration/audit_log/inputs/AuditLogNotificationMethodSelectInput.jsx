import React from "react";
import PropTypes from "prop-types";
import AuditLogNotificationMethodSelectInputBase
  from "components/common/list_of_values_input/notifications/method/audit_logs/AuditLogNotificationMethodSelectInputBase";
import auditLogActionConstants from "@opsera/definitions/constants/audit-logs/actions/auditLogAction.constants";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

export default function AuditLogNotificationMethodSelectInput(
  {
    fieldName,
    model,
    setModel,
    notificationConfigurationModel,
    setNotificationConfigurationModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newObjectType = selectedOption?.value;
    model?.setData(fieldName, newObjectType);
    model?.setDefaultValue("configuration");
    notificationConfigurationModel.resetData();

    if (newObjectType) {
      const eventSelectOptions = auditLogActionConstants.getActionSelectOptionsForType(newObjectType);
      const valueArray = constantsHelper.getValuesForSelectOptionsArray(eventSelectOptions);
      notificationConfigurationModel?.setData("events", valueArray);
      model?.setData("configuration.events", valueArray);
    }

    setNotificationConfigurationModel({...notificationConfigurationModel});
    model?.setDefaultValue("target");
    setModel({...model});
  };

  return (
    <AuditLogNotificationMethodSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

AuditLogNotificationMethodSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AuditLogNotificationMethodSelectInput.defaultProps = {
  fieldName: "method"
};
