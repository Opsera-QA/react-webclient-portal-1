import React from "react";
import PropTypes from "prop-types";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
export default function InlineUserFilterSelectInput(
  { 
    filterModel,
    loadDataFunction,
    className,
    visible,
    fieldName,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?._id);
    filterModel.setData("ownerName", `${selectedOption?.firstName} ${selectedOption?.lastName} (${selectedOption?.email})`);
    loadDataFunction({...filterModel});
  };

  return (
    <LdapOwnerFilter
      filterModel={filterModel}
      setDataFunction={setDataFunction}
      className={className}
      visible={visible}
      fieldName={fieldName}
      placeholderText={"Filter by User"}
      inline={true}
    />
  );
}

InlineUserFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
};


