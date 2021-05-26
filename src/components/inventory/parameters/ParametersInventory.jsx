import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import PropTypes from "prop-types";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";

function ParametersInventory({ customerAccessRules }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [parameterList, setParameterList] = useState([]);
  const [parameterFilterModel, setParameterFilterModel] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(parameterFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getParameters(filterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getParameters = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(getAccessToken, cancelSource, filterDto);

    console.log("received parameters: " + JSON.stringify(response));

    if (isMounted?.current === true && response?.data?.data) {
      setParameterList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  return (<></>
    // <ParameterTable
    //   isLoading={isLoading}
    //   loadData={loadData}
    //   saveCookies={saveCookies}
    //   data={parameterList}
    //   toolFilterDto={parameterFilterModel}
    //   setToolFilterDto={setParameterFilterModel}
    //   customerAccessRules={customerAccessRules}
    // />
  );
}

ParametersInventory.propTypes = {
  customerAccessRules: PropTypes.object,
};

export default ParametersInventory;