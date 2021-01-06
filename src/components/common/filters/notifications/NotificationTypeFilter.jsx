import React, {useState} from "react";
import PropTypes from "prop-types";
import {notificationTypes} from "components/common/list_of_values_input/notifications/NotificationTypeSelectInput";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import DtoFilterSelectInput from "components/common/filters/input/DtoFilterSelectInput";

function NotificationTypeFilter({ filterDto, setFilterDto, fieldName, setDataFunction}) {
  const [notificationTypeFilterOptions, setNotificationTypeFilterOptions] = useState(createFilterOptions(notificationTypes, "Type", "name", "value"));

  return (
    <div>
      <DtoFilterSelectInput
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
};

NotificationTypeFilter.defaultProps = {
  fieldName: "type"
};

export default NotificationTypeFilter;
