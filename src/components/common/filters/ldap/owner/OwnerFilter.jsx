import React from "react";
import PropTypes from "prop-types";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";

export default function OwnerFilter(
  { 
    filterModel, 
    setFilterModel, 
    className,
    visible,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?._id);
    filterModel.setData("ownerName", `${selectedOption?.firstName} ${selectedOption?.lastName} (${selectedOption?.email})`);
    setFilterModel({...filterModel});
  };

  return (
    <LdapOwnerFilter
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      setDataFunction={setDataFunction}
      className={className}
      visible={visible}
    />
  );
}

OwnerFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  visible: PropTypes.bool,
};


