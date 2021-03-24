import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";

function DashboardSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardsList, setDashboardsList] = useState([]);
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
      await getDashboards(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboards = async (cancelSource = cancelTokenSource) => {
    let response = await dashboardsActions.getAllDashboardsLovV2(getAccessToken, cancelSource);
    const dashboards = response?.data?.data;

    if (isMounted?.current === true && dashboards) {
      setDashboardsList(dashboards);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardsList}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField="_id"
      textField="name"
      disabled={disabled}
    />
  );
}

DashboardSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  setDataFunction: PropTypes.func
};

DashboardSelectInput.defaultProps = {
  fieldName: "type",
};

export default DashboardSelectInput;