import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ToolIdentifierSelectionCardView from "components/admin/tools/identifiers/ToolIdentifierSelectionCardView";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";
import TableCardView from "components/common/table/TableCardView";
import {hasStringValue, stringIncludesValue} from "components/common/helpers/string-helpers";
import ToolIdentifierSelectionTable from "components/admin/tools/identifiers/ToolIdentifierSelectionTable";

function ToolIdentifierSelectionScreen({toolModel, setToolModel, closePanel}) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [toolIdentifierFilterModel, setToolIdentifierFilterModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setToolIdentifierFilterModel(new ToolFilterModel());

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
      setLoading(true);
      await getToolIdentifiers(cancelSource);
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

  const getToolIdentifiers = async (cancelSource) => {
    try {
      const response = await toolIdentifierActions.getToolIdentifiersV2(getAccessToken, cancelSource, "active", true);
      const identifiers = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(identifiers)) {
        setToolIdentifiers(identifiers);
      }
    } catch (error) {

      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const setDataFunction = (toolIdentifier) => {
    const newModel = {...toolModel};
    newModel.setData("tool_identifier", toolIdentifier?.identifier);
    newModel.setData("tool_type_identifier", toolIdentifier?.tool_type_identifier);
    newModel.setData("configuration", {});
    setToolModel({...newModel});
  };

  const getFilteredData = () => {
    const searchTerm = toolIdentifierFilterModel?.getFilterValue("search");

    if (hasStringValue(searchTerm)) {
      return toolIdentifiers.filter((toolIdentifier) => {
        const name = toolIdentifier?.name;
        const identifier = toolIdentifier?.identifier;
        const description = toolIdentifier?.description;

        return (
             stringIncludesValue(name, searchTerm)
          || stringIncludesValue(identifier, searchTerm)
          || stringIncludesValue(description, searchTerm)
        );
      });
    }

    return toolIdentifiers;
  };

  const getCardView = () => {
    return (
      <div className={"scroll-y full-screen-overlay-selection-container hide-x-overflow"}>
        <ToolIdentifierSelectionCardView
          toolIdentifiers={getFilteredData()}
          setDataFunction={setDataFunction}
          toolIdentifierMetadata={toolIdentifierMetadata}
          isLoading={isLoading}
          loadData={loadData}
        />
      </div>
    );
  };

  const getTableView = () => {
    return (
      <div className={"scroll-y full-screen-overlay-selection-container hide-x-overflow"}>
        <ToolIdentifierSelectionTable
          isMounted={isMounted}
          toolIdentifiers={getFilteredData()}
          isLoading={isLoading}
          loadData={loadData}
          setDataFunction={setDataFunction}
        />
      </div>
    );
  };


  const getTableCardView = () => {
    return (
      <TableCardView
        filterModel={toolIdentifierFilterModel}
        data={toolIdentifiers}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={toolIdentifierFilterModel}
      setFilterDto={setToolIdentifierFilterModel}
      supportClientSideSearching={true}
      supportViewToggle={true}
      isLoading={isLoading}
      body={getTableCardView()}
      metadata={toolIdentifierMetadata}
      titleIcon={faTools}
      title={"Select Which Tool You Would Like to Create"}
      className={"mx-2 mt-2"}
    />
  );
}

ToolIdentifierSelectionScreen.propTypes = {
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
  closePanel: PropTypes.func,
};

export default ToolIdentifierSelectionScreen;