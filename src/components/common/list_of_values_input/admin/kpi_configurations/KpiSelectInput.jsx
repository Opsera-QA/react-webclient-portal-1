import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/SelectInputBase";

function KpiSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
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

    if (response?.data?.data != null) {
      setKpis(response?.data?.data);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
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
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

KpiSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default KpiSelectInput;