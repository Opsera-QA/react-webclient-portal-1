import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import FieldQueryComponent from "./FieldQueryComponent";
import customSettingQueryMetadata from "./custom-setting-query-metadata";
import TextAreaClipboardField from "../../../../../../../common/fields/clipboard/TextAreaClipboardField";
import DetailPanelContainer from "../../../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import { getMigrationTypeLabel } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import { faSave } from "@fortawesome/pro-light-svg-icons";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";

const operators = [
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "STARTS WITH",
  "ENDS WITH",
  "CONTAINS",
  "IN",
  "NOT IN",
  "INCLUDES",
  "EXCLUDES",
];
const CustomSettingQueryBuilderScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [fieldsList, setFieldsList] = useState([]);
  const [queryFilters, setQueryFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [wizardModel?.getData("selectedFieldList")]);

  const loadData = () => {
    try {
      if (wizardModel?.getData("selectedFieldList")) {
        const filteredData = wizardModel
          ?.getData("selectedFieldList")
          ?.filter((item) => {
            return item.filterable === true;
          });

        const filteredFieldsList = filteredData.map((item) => {
          return item.name;
          // return { label: item.label, name: item.name };
        });
        setFieldsList(filteredFieldsList);

        const filters =
          Array.isArray(wizardModel?.getData("queryFilters")) &&
          wizardModel?.getData("queryFilters").length > 0
            ? wizardModel?.getData("queryFilters")
            : [];
        if (filters.length === 0) {
          filters.push({ ...customSettingQueryMetadata.newObjectFields });
        }
        setQueryFilters([...filters]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFieldChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].field = value;
      return newFilters;
    });
  };

  const handleOperatorChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].operator = value;
      return newFilters;
    });
  };

  const handleValueChange = (index, value) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index].value = value;
      return newFilters;
    });
  };

  const handleAddFilter = () => {
    setQueryFilters((prevFilters) => [
      ...prevFilters,
      { field: fieldsList[0], operator: operators[0], value: "" },
    ]);
  };

  const handleRemoveFilter = (index) => {
    setQueryFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(index, 1);
      return newFilters;
    });
  };

  const generateQuery = () => {
    const whereClause = queryFilters
      .map((filter) => {
        switch (filter.operator) {
          case "=":
          case "!=":
          case ">":
          case ">=":
          case "<":
          case "<=":
            return `${filter.field} ${filter.operator} '${filter.value}'`;
          case "STARTS WITH":
            return `${filter.field} LIKE '${filter.value}%'`;
          case "ENDS WITH":
            return `${filter.field} LIKE '%${filter.value}'`;
          case "CONTAINS":
            return `${filter.field} LIKE '%${filter.value}%'`;
          case "IN":
            return `${filter.field} IN (${filter.value})`;
          case "NOT IN":
            return `${filter.field} NOT IN (${filter.value})`;
          case "INCLUDES":
            return `${filter.value} IN ${filter.field}`;
          case "EXCLUDES":
            return `${filter.value} NOT IN ${filter.field}`;
          default:
            return `${filter.field} ${filter.operator} '${filter.value}'`;
        }
      })
      .join(" AND ");
    const query = `SELECT ${fieldsList.join(", ")} FROM ${
      wizardModel?.getData("selectedCustomSetting")?.componentName
    }${whereClause ? ` WHERE ${whereClause}` : ""}`;
    return query;
  };

  const query = useMemo(() => generateQuery(), [queryFilters]);
  const handleBackButton = () => {
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };

  const saveAndProceed = async () => {
    try {
      setIsLoading(true);
      wizardModel.setData("filterQuery",query);
      wizardModel.setData("queryFilters",queryFilters);
      await customSettingMigrationTaskWizardActions.setFilterQuery(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
        query,
        queryFilters,
      );
      setCurrentScreen(CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIRMATION_SCREEN);
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };
  const getBody = () => {
    if (wizardModel == null) {
      return (
        <CenterLoadingIndicator
          minHeight={"500px"}
          message={`Loading`}
        />
      );
    }

    return (
      <div>
        <div className={"m-3"}>
          {fieldsList &&
            fieldsList.length > 0 &&
            queryFilters &&
            queryFilters.length > 0 && (
              <div>
                {queryFilters.map((filter, index) => (
                  <FieldQueryComponent
                    key={index}
                    index={index}
                    fields={fieldsList}
                    operators={operators}
                    filter={filter}
                    onFieldChange={handleFieldChange}
                    onOperatorChange={handleOperatorChange}
                    onValueChange={handleValueChange}
                    onRemove={handleRemoveFilter}
                    onAdd={handleAddFilter}
                    isRemovable={queryFilters.length > 1}
                  />
                ))}
                <div>
                  <TextAreaClipboardField
                    allowResize={false}
                    rows={10}
                    textAreaValue={query}
                    description={`SOQL query generated based of filter selection made above.`}
                  />
                </div>
              </div>
            )}
        </div>
        <SaveButtonContainer>
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              handleBackButton();
            }}
          >
            <IconBase
              icon={faArrowLeft}
              fixedWidth
              className="mr-2"
            />
            Back
          </Button>
          <Button
            className={"mr-2"}
            size="sm"
            variant="primary"
            onClick={saveAndProceed}
            disabled={isLoading}
          >
            <span>
              <IconBase
                icon={faSave}
                isLoading={isLoading}
                fixedWidth
                className="mr-2"
              />
              {isLoading ? "Saving Query" : "Save and Proceed"}
            </span>
          </Button>
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <H5FieldSubHeader
          subheaderText={`${getMigrationTypeLabel(
            taskType,
          )} : Query Builder Screen`}
        />
      </Row>
      <div className={"my-3"}>{getBody()}</div>
    </DetailPanelContainer>
  );
};

CustomSettingQueryBuilderScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingQueryBuilderScreen;
