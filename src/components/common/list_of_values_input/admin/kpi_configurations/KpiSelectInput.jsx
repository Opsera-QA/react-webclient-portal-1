import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";

function KpiSelectInput({ fieldName, dataObject, setDataObject, setCurrentKpi, setDataPoints, setDataFunction, disabled, textField, valueField, status, policySupport, manualDataEntry }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [kpis, setKpis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadKpis(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadKpis = async (cancelSource = cancelTokenSource) => {
    const response = await KpiActions.getAllKpisV2(getAccessToken, cancelSource, status, policySupport, manualDataEntry);

    const kpis = response?.data?.data;

    if (isMounted?.current === true && kpis) {
      setKpis(kpis);

      if (setCurrentKpi && dataObject.getData(fieldName) !== "") {
        const selectedKpi = kpis.find((kpi) => kpi.identifier === dataObject.getData(fieldName));
        setCurrentKpi(selectedKpi);
        setDataPoints(selectedKpi["dataPoints"]);
      }
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
  setDataPoints: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  status: PropTypes.string,
  policySupport: PropTypes.string,
  manualDataEntry: PropTypes.bool
};

KpiSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name",
  status: "active"
};

export default KpiSelectInput;