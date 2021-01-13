import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function KpiSelectInput({ fieldName, dataObject, setDataObject, setCurrentKpi, setDataFunction, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [kpis, setKpis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadKpis();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadKpis = async () => {
    const response = await KpiActions.getAllKpis(getAccessToken);

    const kpis = response?.data?.data;

    if (kpis != null) {
      if (setCurrentKpi && dataObject.getData(fieldName) !== "") {
        const selectedKpi = kpis.find((kpi) => kpi.identifier === dataObject.getData(fieldName))
        setCurrentKpi(selectedKpi);
      }

      setKpis(kpis);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={kpis}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

KpiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  setCurrentKpi: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

KpiSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default KpiSelectInput;