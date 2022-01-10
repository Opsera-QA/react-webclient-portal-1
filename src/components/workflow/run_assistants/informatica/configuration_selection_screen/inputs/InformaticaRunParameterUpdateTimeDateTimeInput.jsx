import React from "react";
import PropTypes from "prop-types";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";

const InformaticaRunParameterUpdateTimeDateTimeInput = (
  {
    informaticaRunParameterConfigurationModel,
    setInformaticaRunParameterConfigurationModel,
  }) => {
  const setDataFunction = (fieldName, newDate) => {
    const newModel = {...informaticaRunParameterConfigurationModel};
    const parsedDate = newDate.toISOString().split('.')[0] + "Z";
    newModel.setData(fieldName, parsedDate);
    setInformaticaRunParameterConfigurationModel({...newModel});
  };

  return (
    <DateTimeInput
      fieldName={"updateTime"}
      setDataFunction={setDataFunction}
      dataObject={informaticaRunParameterConfigurationModel}
      setDataObject={setInformaticaRunParameterConfigurationModel}
      defaultToNull={true}
      maxDate={new Date()}
    />
  );
};

InformaticaRunParameterUpdateTimeDateTimeInput.propTypes = {
  informaticaRunParameterConfigurationModel: PropTypes.object,
  setInformaticaRunParameterConfigurationModel: PropTypes.func,
};

export default InformaticaRunParameterUpdateTimeDateTimeInput;
