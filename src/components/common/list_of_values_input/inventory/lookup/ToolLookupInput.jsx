import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useGetRegistryTools from "hooks/tools/useGetRegistryTools";
import ToolsTable from "components/inventory/tools/ToolsTable";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import ToolCardView from "components/inventory/tools/ToolCardView";
import TableCardView from "components/common/table/TableCardView";
import FilterContainer from "components/common/table/FilterContainer";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import {faTools} from "@fortawesome/pro-light-svg-icons";

const fields = ["name", "owner"];

export default function ToolLookupInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const {
    isLoading,
    error,
    registryTools,
    registryToolFilterModel,
    setRegistryToolFilterModel,
    loadData,
  } = useGetRegistryTools(fields);

  const getDropdownFilters = () => {
    return(
      <>
        <ActiveFilter
          filterDto={registryToolFilterModel}
          setFilterDto={setRegistryToolFilterModel}
          className={"mb-2"}
        />
        <OwnerFilter
          filterModel={registryToolFilterModel}
          setFilterModel={setRegistryToolFilterModel}
          className={"mb-2"}
        />
        <TagFilter
          filterDto={registryToolFilterModel}
          setFilterDto={setRegistryToolFilterModel}
        />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineToolIdentifierFilter
        filterModel={registryToolFilterModel}
        setFilterModel={setRegistryToolFilterModel}
        loadData={loadData}
        className={"mr-2"}
        isLoading={isLoading}
      />
    );
  };

  const getCardView = () => {
    return (
      <ToolCardView
        isLoading={isLoading}
        loadData={loadData}
        data={registryTools}
        registryToolFilterModel={registryToolFilterModel}
        setRegistryToolFilterModel={setRegistryToolFilterModel}
      />
    );
  };

  const getTableView = () => {
    return (
      <ToolsTable
        isLoading={isLoading}
        loadData={loadData}
        data={registryTools}
        registryToolFilterModel={registryToolFilterModel}
        setRegistryToolFilterModel={setRegistryToolFilterModel}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <TableCardView
        filterModel={registryToolFilterModel}
        data={registryTools}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={registryToolFilterModel}
      setFilterDto={setRegistryToolFilterModel}
      supportSearch={true}
      supportViewToggle={true}
      isLoading={isLoading}
      metadata={registryToolMetadata}
      body={getTableCardView()}
      dropdownFilters={getDropdownFilters()}
      inlineFilters={getInlineFilters()}
      titleIcon={faTools}
      title={"Tools"}
      className={"px-2 pb-2"}
    />
  );
}

ToolLookupInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolLookupInput.defaultProps = {
  valueField: "_id",
  textField: "name"
};
