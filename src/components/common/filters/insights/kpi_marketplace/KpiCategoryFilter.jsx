import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import WarningDialog from "../../../status_notifications/WarningDialog";
import {createFilterOptions} from "../../filterHelpers";
import kpiLovHelpers from "../../../list_of_values_input/admin/kpi_configurations/kpi-lov-helpers";

function KpiCategoryFilter({ fieldName, filterDto, setFilterDto, setDataFunction}) {
  const [field] = useState(filterDto.getFieldById(fieldName));

  // TODO: Use this instead of the method inside marketplace.jsx
  const validateAndSetData = (value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    setFilterDto({...newDataObject});
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"} />
  }

  return (
    <div>
      {/*<label><span>{field.label}</span></label>*/}
      <DropdownList
        data={createFilterOptions(kpiLovHelpers.categories, "Category", "label", "id")}
        textField="text"
        valueField="value"
        value={filterDto.getData(fieldName)}
        placeholder="Category Filter"
        filter="contains"
        // TODO: Change to this when filters are updated
        // onChange={(data) => validateAndSetData(data)}
        onChange={(data) => setDataFunction(fieldName, data)}
      />
    </div>
  );
}

KpiCategoryFilter.propTypes = {
  fieldName: PropTypes.string,
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  setDataFunction: PropTypes.func,
};

KpiCategoryFilter.defaultProps = {
  fieldName: "category"
}

export default KpiCategoryFilter;