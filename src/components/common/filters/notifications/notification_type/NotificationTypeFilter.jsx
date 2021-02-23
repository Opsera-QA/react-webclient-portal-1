import React, {useState} from "react";
import PropTypes from "prop-types";
import {notificationTypes} from "components/common/list_of_values_input/notifications/NotificationTypeSelectInput";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function NotificationTypeFilter({ filterDto, setFilterDto, fieldName, setDataFunction, className}) {
  const [notificationTypeFilterOptions, setNotificationTypeFilterOptions] = useState(createFilterOptions(notificationTypes, "Type", "name", "value"));

  return (
    <div className={className}>
      <FilterSelectInputBase
        busy={notificationTypeFilterOptions == null}
        placeholderText={"Filter by Type"}
        fieldName={fieldName}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        setDataFunction={setDataFunction}
        selectOptions={notificationTypeFilterOptions}
      />
    </div>
  );
}


NotificationTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string
};

NotificationTypeFilter.defaultProps = {
  fieldName: "type"
};

export default NotificationTypeFilter;
