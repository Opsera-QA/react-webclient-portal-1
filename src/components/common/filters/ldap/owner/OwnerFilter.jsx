import React from "react";
import PropTypes from "prop-types";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import sessionHelper from "utils/session.helper";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

function OwnerFilter(
  { 
    filterModel, 
    setFilterModel, 
    className,
    visible,
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

export default OwnerFilter;


