import React, { useState } from "react";
import PropTypes from "prop-types";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import DataSeedingFieldEditorPanel from "./DataSeedingFieldEditorPanel";
import { DividerWithCenteredText } from "../../../../../../../../temp-library-components/divider/DividerWithCenteredText";

const DataSeedingFieldSelectionBaseEditorPanel = ({
  id,
  fieldsList,
  setFieldData,
}) => {
  const [searchText, setSearchText] = useState("");

  const updateSearchText = (value) => {
    setSearchText(value);
  };
  const getSearchBar = () => {
    return (
      <div
        className="membership-search d-flex mx-auto my-3"
        style={{ width: "97%" }}
      >
        <IconBase
          icon={faSearch}
          iconClassName={"mr-2 opsera-dark-purple h-100"}
          className={"mb-4"}
        />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control mb-4"
          onChange={(event) => updateSearchText(event.target.value)}
        />
      </div>
    );
  };

  const getFilteredFields = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return fieldsList.filter((field) => {
        return field?.name?.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return fieldsList;
  };

  return (
    <div>
      {getSearchBar()}
      {fieldsList ? (
        getFilteredFields()?.map((field, idx, { length }) => (
          <div key={idx}>
            <DataSeedingFieldEditorPanel
              id={id}
              fieldIndex={idx}
              fieldsData={field}
              setFieldData={setFieldData}
            />
            {idx + 1 !== length && <DividerWithCenteredText />}
          </div>
        ))
      ) : (
        <small className={"text-muted form-text mt-4"}>
          <div>No fields found for the selected dependent object</div>
        </small>
      )}
    </div>
  );
};

DataSeedingFieldSelectionBaseEditorPanel.propTypes = {
  id: PropTypes.number,
  setFieldData: PropTypes.func,
  isLoading: PropTypes.bool,
  fieldsList: PropTypes.array,
};

export default DataSeedingFieldSelectionBaseEditorPanel;
