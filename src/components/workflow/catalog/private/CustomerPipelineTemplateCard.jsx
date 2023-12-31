import PropTypes from "prop-types";
import {Card, Col, Row} from "react-bootstrap";
import {faDraftingCompass, faHexagon, faTools} from "@fortawesome/pro-light-svg-icons";
import {format} from "date-fns";
import React, {useEffect, useState} from "react";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateCustomerPipelineButton from "components/workflow/catalog/private/deploy/CreateCustomerPipelineButton";
import modelHelpers from "components/common/model/modelHelpers";
import {truncateString} from "components/common/helpers/string-helpers";
import ViewCustomerPipelineTemplateDetailsButton
  from "components/workflow/catalog/private/ViewCustomerPipelineTemplateDetailsButton";
import {createPipelineFromTemplateMetadata} from "components/workflow/catalog/createPipelineFromTemplate.metadata";
import SelectButtonBase from "components/common/buttons/select/base/SelectButtonBase";

// TODO: This needs to be rewritten, I just copied what existed for the catalog work
export default function CustomerPipelineTemplateCard(
  {
    template,
    activeTemplates,
    selectTemplateFunction,
  }) {
  const [disabled, setDisabled] = useState(false);
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator !== true && (template.readOnly || (template.singleUse === true && activeTemplates.includes(template?._id?.toString())))) {
      setDisabled(true);
    }
  }, [template, activeTemplates]);

  const getBody = () => {
    if (disabled === true) {
      return;
    }

    if (selectTemplateFunction) {
      return (
        <Col xs={6} className={"d-flex"}>
          <SelectButtonBase
            setDataFunction={() => selectTemplateFunction(modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata))}
            selectOption={template}
            icon={faDraftingCompass}
            selectText={"Select Pipeline"}
            variant={"primary"}
          />
        </Col>
      );
    }

    return (
      <Col xs={6} className={"d-flex"}>
        <CreateCustomerPipelineButton
          customerPipelineTemplateModel={modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata)}
          className={"mr-2"}
        />
        <ViewCustomerPipelineTemplateDetailsButton
          templateId={template?._id}
        />
      </Col>
    );
  };

  const getDisabledText = () => {
    if (disabled) {
      if (template?.readOnly) {
        return (
          <Col>
            <div className="info-text">Not available for use at this time.</div>
          </Col>
        );
      }

      if (template?.singleUse) {
        return (
          <Col>
            <div className="info-text">Already in use as a pipeline.</div>
          </Col>
        );
      }
    }
  };

  return (
    <Card style={{height: "100%", opacity: template.readOnly ? ".5" : "1"}}>
      <Card.Title className="pb-0">
        <div className="d-flex catalog-card-title p-2">
          <div>
            {template.name}
          </div>
          <div className={"ml-auto mr-1"}>
            <IconBase icon={faHexagon} size={"lg"}/>
          </div>
        </div>
      </Card.Title>
      <Card.Body className="pt-0 pb-2">
        <Row className="catalog-card-text">
          <Col lg={12}>
            <Card.Text className="mb-2">{truncateString(template.description, 150)}</Card.Text>
          </Col>
        </Row>
        <Row className="d-flex">
          {getDisabledText()}
          {getBody()}
          <Col xs={6} className={"d-flex"}>
            <div className={"w-100 d-flex"}>
              <div className={"ml-auto"}>
                <div><small><span className="text-muted mr-1 pb-1">Updated:</span><span
                  className="text-nowrap">{template.updatedAt && format(new Date(template.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
                <div><small><span className="text-muted mr-1 pb-1">Created:</span><span
                  className="">{template.updatedAt && format(new Date(template.createdAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

CustomerPipelineTemplateCard.propTypes = {
  template: PropTypes.object,
  activeTemplates: PropTypes.array,
  selectTemplateFunction: PropTypes.func,
};