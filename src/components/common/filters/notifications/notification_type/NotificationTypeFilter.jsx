import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {NOTIFICATION_TYPE_SELECT_OPTIONS} from "components/notifications/notificationTypes.constants";

function NotificationTypeFilter({ filterDto, setFilterDto, fieldName, setDataFunction, className, inline}) {
  return (
    <FilterSelectInputBase
      placeholderText={"Filter by Notification Type"}
      fieldName={fieldName}
      className={className}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      setDataFunction={setDataFunction}
      selectOptions={NOTIFICATION_TYPE_SELECT_OPTIONS}
      textField={"text"}
      valueField={"value"}
      inline={inline}
    />
  );
}


NotificationTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool
};

NotificationTypeFilter.defaultProps = {
  fieldName: "type"
};

export default NotificationTypeFilter;
