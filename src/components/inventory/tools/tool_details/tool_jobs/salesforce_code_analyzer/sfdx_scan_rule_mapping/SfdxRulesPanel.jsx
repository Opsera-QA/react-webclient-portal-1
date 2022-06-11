import React, {useContext, useEffect, useRef, useState} from "react";
import SfdxRulesTable from "./SfdxRulesTable";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import {AuthContext} from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import sfdxScanActions from "../sfdx-scan-actions";
import SfdxRulesEditorPanel from "./details/SfdxRulesEditorPanel";

function SfdxRulesPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  // TODO: Replace with actual filter model for this area OR make generic one
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
  const [isLoading, setIsLoading] = useState(false);
  const [toolRules, setToolRules] = useState([]);
  const [pmdRules, setPmdRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(undefined);

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
      setIsLoading(true);
      await getPmdRules(filterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPmdRules = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await sfdxScanActions.getSfdxScanMappings(getAccessToken, cancelSource, toolData?.getData("_id"));
    const mappings = response?.data?.data;
    // const userRoleAccess = await getAccessRoleData();

    if (isMounted?.current === true && Array.isArray(mappings)) {
      setToolRules([...mappings]);
      unpackRules(mappings);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setParameterFilterModel({ ...newFilterDto });
    }
  };

  // TODO: This is a current workaround until I can refactor the area further.
  const unpackRules = (rules) => {
    const newList = [];

    //TODO: Don't unpack these objects and instead just use the main ones.
    if (Array.isArray(rules)) {
      rules.forEach((rule, index) => {
        let mapRule = rule.configuration;
        mapRule = {...mapRule, ruleId: rule?._id};
        mapRule = {...mapRule, index: index};
        newList?.push(mapRule);
      });
    }

    setPmdRules(newList);
  };

  const closeEditorPanel = async () => {
    setSelectedRule(undefined);
    await loadData();
  };

  if (selectedRule != null) {
    return (
      <SfdxRulesEditorPanel
        loadData={loadData}
        handleClose={closeEditorPanel}
        toolData={toolData}
        pmdRuleData={selectedRule}
        ruleId={selectedRule?.getData("ruleId")}
      />
    );
  }

  return (
    <SfdxRulesTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      pmdRules={pmdRules}
      setSelectedRule={setSelectedRule}
      toolRules={toolRules}
    />
  );
}

SfdxRulesPanel.propTypes = {
  toolData: PropTypes.object,
};
export default SfdxRulesPanel;
