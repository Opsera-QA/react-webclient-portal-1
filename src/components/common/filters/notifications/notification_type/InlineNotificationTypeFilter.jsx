import React from "react";
import PropTypes from "prop-types";
import NotificationTypeFilter from "components/common/filters/notifications/notification_type/NotificationTypeFilter";

function InlineNotificationTypeFilter({ filterModel, setFilterModel, fieldName, className, loadData, isLoading }) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <NotificationTypeFilter
      className={className}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      loadingData={isLoading}
      fieldName={fieldName}
      setDataFunction={validateAndSetData}
      inline={true}
    />
  );
}


InlineNotificationTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

InlineNotificationTypeFilter.defaultProps = {
  fieldName: "type"
};

export default InlineNotificationTypeFilter;


