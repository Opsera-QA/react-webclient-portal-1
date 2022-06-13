import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import axios from "axios";

function KpiIdentifierFilter({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, textField, valueField, status, policySupport, manualDataEntry}) {
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
    }
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By KPI"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      selectOptions={kpis}
      setDataFunction={setDataFunction}
    />
  );
}

KpiIdentifierFilter.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  status: PropTypes.string,
  policySupport: PropTypes.string,
  manualDataEntry: PropTypes.bool,
};

KpiIdentifierFilter.defaultProps = {
  fieldName: "identifier",
  textField: "name",
  valueField: "identifier",
  status: "active",
};

export default KpiIdentifierFilter;