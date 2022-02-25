import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {List} from "@opsera/dhx-suite-package";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import ComponentLoadingWrapper from "components/common/loading/ComponentLoadingWrapper";
import FieldContainer from "components/common/fields/FieldContainer";

function ListFieldBase({fieldName, dataObject, selectOptions, valueField, textField, isLoading, height, icon, searchFunction, customTemplate, noDataMessage, title}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [list, setList] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectOptions == null) {
      return;
    }

    let list = constructList();

    return () => {
      list?.destructor();
    };
  }, [selectOptions, isLoading, searchTerm]);

  const constructList = () => {
    if (Array.isArray(selectOptions) && selectOptions.length > 0) {
      selectOptions.forEach(data => data.id = data[valueField]);
    }

    let list = new List(containerRef.current, {
      data: selectOptions,
      selection: false,
      template
    });

    if (searchFunction && searchTerm !== "") {
      list.data.filter((item) => {
        return searchFunction(item, searchTerm);
      });
    }
    else {
      list.data.filter();
    }

    setList(list);
    return list;
  };

  const template = (item) => {
    if (customTemplate) {
      return customTemplate(item);
    }

    return (`
      <div class='list_item'>
        <div class='item_name'>${item[textField]}</div>
      </div>
    `);
  };

  const getItemCount = () => {
    return Array.isArray(selectOptions) ? selectOptions.length : 0;
  };

  // TODO: Remake to something that makes more sense
  const getExtraRow = () => {
    return (
      <div className={"px-2 py-1 title-bar-selection-row d-flex justify-content-between"}>
        <div className={"text-muted"}>{getItemCount()} items</div>
      </div>
    );
  };

  const getList = () => {
    return (
      <div
        id="list"
        style={{width: "100%", height: height}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  const getBody = () => {
    return (
      <div style={{height: height}}>
        <ComponentLoadingWrapper
          isLoading={isLoading}
          data={selectOptions}
          component={getList()}
          noDataMessage={noDataMessage}
        />
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className="list-input my-2">
      <div className={"content-container"}>
        <InputTitleBar
          disabled={true}
          icon={icon}
          isLoading={isLoading}
          customTitle={title}
          field={field}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          showSearchBar={searchFunction != null}
        />
        {getExtraRow()}
        {getBody()}
      </div>
    </FieldContainer>
  );
}

ListFieldBase.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  isLoading: PropTypes.bool,
  showLabel: PropTypes.bool,
  height: PropTypes.string,
  icon: PropTypes.object,
  searchFunction: PropTypes.func,
  customTemplate: PropTypes.func,
  noDataMessage: PropTypes.string,
  title: PropTypes.string
};

ListFieldBase.defaultProps = {
  height: "300px",
  noDataMessage: "No items are currently available"
};

export default ListFieldBase;