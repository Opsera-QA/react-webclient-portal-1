import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {getNotificationTypeLabel} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";

function NotificationTypeField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  return (
    <ConstantFieldBase
      getLabelFunction={getNotificationTypeLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

NotificationTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default NotificationTypeField;