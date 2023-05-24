import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ClearSearchFilterButton from "temp-library-components/button/clear/ClearSearchFilterButton";

function SearchFilter(
  {
    paginationModel,
    loadData,
    disabled,
    fieldName,
    className,
    isLoading,
    metadata,
    searchText,
    visible,
    variant,
  }) {
  const history = useHistory();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setCurrentSearchTerm(DataParsingHelper.parseString(searchText, ""));
  }, [searchText]);

  const handleSearch = async () => {
    try {
      const searchString = currentSearchTerm;

      if (isMongoDbId(searchString) && paginationModel?.getDetailViewLink && paginationModel?.getDetailViewLink(searchString) != null) {
        const link = paginationModel?.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      if (metadata?.detailView != null && isMongoDbId(searchString)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      const maxLength = DataParsingHelper.parseInteger(paginationModel?.getMaxLength(fieldName), 25);
      paginationModel.setData(fieldName, searchString.substring(0, maxLength));
      paginationModel.setData("currentPage", 1);
      await loadData(paginationModel);
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
    const maxLength = DataParsingHelper.parseInteger(paginationModel?.getMaxLength(fieldName), 25);
    setCurrentSearchTerm(parsedSearchTerm.substring(0, maxLength));
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  const buttonClassName = variant === "outline-primary" ? "inline-filter-input filter-bg-white" : "inline-filter-input";

  if (visible === false || paginationModel == null || paginationModel.canSearch() === false) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size={"sm"} className={"flex-nowrap"}>
        <InputGroup.Prepend>
          <ClearSearchFilterButton
            fieldName={fieldName}
            disabled={isLoading || disabled}
            paginationModel={paginationModel}
            loadDataFunction={loadData}
            setCurrentSearchTerm={setCurrentSearchTerm}
            variant={variant}
            buttonSize={"sm"}
            buttonClassName={buttonClassName}
            className={buttonClassName}
            currentSearchTerm={currentSearchTerm}
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
            className={buttonClassName}
            disabled={isLoading || disabled}
            variant={variant}
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

SearchFilter.propTypes = {
  paginationModel: PropTypes.object,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  metadata: PropTypes.object,
  searchText: PropTypes.string,
  visible: PropTypes.bool,
  variant: PropTypes.string,
};

SearchFilter.defaultProps = {
  fieldName: "search",
  variant: "outline-primary",
};

export default SearchFilter;


