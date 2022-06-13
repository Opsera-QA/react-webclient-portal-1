import React from "react";
import PropTypes from "prop-types";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";

function OwnerFilter(
  { 
    filterModel, 
    setFilterModel, 
    className,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?.value);
    filterModel.setData("ownerName", selectedOption?.text);
    setFilterModel({...filterModel});
  };

  return (
    <LdapOwnerFilter
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      setDataFunction={setDataFunction}
      className={className}
    />
  );
}

OwnerFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
};

export default OwnerFilter;


