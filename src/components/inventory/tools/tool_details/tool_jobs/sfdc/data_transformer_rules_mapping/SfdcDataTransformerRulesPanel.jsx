import React, {useContext, useEffect, useRef, useState} from "react";
import SfdcDataTransformerRulesTable from "./SfdcDataTransformerRulesTable";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import ParameterFilterModel from "components/inventory/parameters/parameter.filter.model";
import {AuthContext} from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcDataTransformerRulesActions from "./sfdc-data-transformer-rules-actions";
import SfdcDataTransformerRulesEditorPanel from "./details/SfdcDataTransformerRulesEditorPanel";

function SfdcDataTransformerRulesPanel({ toolData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  // TODO: Replace with actual filter model for this area OR make generic one
  const [parameterFilterModel, setParameterFilterModel] = useState(new ParameterFilterModel());
  const [isLoading, setIsLoading] = useState(false);
  const [toolRules, setToolRules] = useState([]);
  const [dataTransformerRules, setDataTransformerRules] = useState([]);
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
      await getdataTransformerRules(filterDto, cancelSource);
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

  const getdataTransformerRules = async (filterDto = parameterFilterModel, cancelSource = cancelTokenSource) => {
    const response = await sfdcDataTransformerRulesActions.getDataTransformerRules(getAccessToken, cancelSource, toolData?.getData("_id"));
    const mappings = response?.data?.data;

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

    setDataTransformerRules(newList);
  };

  const closeEditorPanel = async () => {
    setSelectedRule(undefined);
    await loadData();
  };

  if (selectedRule != null) {
    return (
      <SfdcDataTransformerRulesEditorPanel
        loadData={loadData}
        handleClose={closeEditorPanel}
        toolData={toolData}
        dataTransformerRuleData={selectedRule}
        ruleId={selectedRule?.getData("ruleId")}
      />
    );
  }

  return (
    <SfdcDataTransformerRulesTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      dataTransformerRules={dataTransformerRules}
      setSelectedRule={setSelectedRule}
      toolRules={toolRules}
    />
  );
}

SfdcDataTransformerRulesPanel.propTypes = {
  toolData: PropTypes.object,
};
export default SfdcDataTransformerRulesPanel;
