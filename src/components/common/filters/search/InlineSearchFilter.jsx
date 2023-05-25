import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ClearSearchFilterButton from "temp-library-components/button/clear/ClearSearchFilterButton";

function InlineSearchFilter(
  {
    filterDto,
    setFilterDto,
    loadData,
    disabled,
    fieldName,
    supportSearch,
    className,
    isLoading,
    metadata,
    searchText,
  }) {
  const history = useHistory();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const {
    isFreeTrial,
  } = useComponentStateReference();

  useEffect(() => {
    setCurrentSearchTerm(DataParsingHelper.parseString(searchText, ""));
  }, [searchText]);

  const handleSearch = async () => {
    try {
      const searchString = filterDto.getData(fieldName);

      if (metadata?.detailView != null && isMongoDbId(searchString)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      // TODO: Replace top detail view link check with this once everywhere is updated
      if (isMongoDbId(searchString) && filterDto?.getDetailViewLink && filterDto?.getDetailViewLink(searchString) != null) {
        const link = filterDto?.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      filterDto.setData("currentPage", 1);

      // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
      //  Leaving here for now to prevent unintended side effects
      if (setFilterDto) {
        setFilterDto({...filterDto});
      }

      await loadData(filterDto);
    }
    finally {
      setIsSearching(false);
    }
  };

  const updateSearchTerm = (newSearchTerm) => {
    const parsedSearchTerm = DataParsingHelper.parseString(
      newSearchTerm,
      "",
      undefined,
      undefined,
      false,
    );
    const maxLength = DataParsingHelper.parseInteger(filterDto?.getMaxLength(fieldName), 25);
    const finalSearchTerm = parsedSearchTerm.substring(0, maxLength);
    setCurrentSearchTerm(finalSearchTerm);

    // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
    //  Leaving here for now to prevent unintended side effects
    if (setFilterDto) {
      filterDto?.setData(fieldName, finalSearchTerm);
      setFilterDto({...filterDto});
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  if (supportSearch !== true || filterDto == null) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup
        size={"sm"}
        className={"flex-nowrap"}
      >
        <InputGroup.Prepend>
          <ClearSearchFilterButton
            fieldName={fieldName}
            disabled={isLoading}
            paginationModel={filterDto}
            loadDataFunction={loadData}
            setCurrentSearchTerm={setCurrentSearchTerm}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
            className={"inline-filter-input"}
            buttonClassName={"inline-filter-input"}
            currentSearchTerm={currentSearchTerm}
            buttonSize={"sm"}
          />
        </InputGroup.Prepend>
        <input
          disabled={disabled || isLoading}
          placeholder={"Search"}
          value={currentSearchTerm}
          className={"text-input inline-search-filter inline-filter-input"}
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => updateSearchTerm(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            className={"inline-filter-input"}
            disabled={isLoading || disabled}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
            onClick={handleSearch}
          >
            <IconBase
              isLoading={isSearching}
              icon={faSearch}
            />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

InlineSearchFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  supportSearch: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  metadata: PropTypes.object,
  searchText: PropTypes.string,
};

InlineSearchFilter.defaultProps = {
  fieldName: "search",
};

export default InlineSearchFilter;


