import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {getNotificationMethodLabel} from "components/common/list_of_values_input/notifications/method/notificationMethod.constants";

function NotificationMethodField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  return (
    <ConstantFieldBase
      getLabelFunction={getNotificationMethodLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

NotificationMethodField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default NotificationMethodField;