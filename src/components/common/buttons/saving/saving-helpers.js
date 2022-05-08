import Model from "core/data_model/model";
import { hasStringValue } from "components/common/helpers/string-helpers";

export async function persistNewRecordAndViewDetails(model, toastContext, showSuccessToasts, createRecord, lenient, history, isIncomplete) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    createRecord,
    lenient,
    true,
    isIncomplete,
    );

  if (response != null && response !== false && history != null) {
    const updatedDto = model.getNewInstance(response?.data, false);
    let link = updatedDto.getDetailViewLink();

    if (hasStringValue(link) === true) {
      toastContext.clearOverlayPanel();
      if (link != null) {
        history.push(link);
      }
    }
  }

  return response;
}

export async function persistNewRecordAndClose(model, toastContext, showSuccessToasts, createRecord, lenient, handleClose, isIncomplete) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    createRecord,
    lenient,
    true,
    isIncomplete,
  );

  if (response != null && response !== false && handleClose) {
    toastContext.clearOverlayPanel();
    handleClose();
  }

  return response;
}

export async function persistNewRecordAndAddAnother(model, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto, isIncomplete) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    createRecord,
    lenient,
    true,
    isIncomplete,
  );

  if (response != null && response !== false && setRecordDto) {
    let newModel = new Model({...model.getNewObjectFields()}, model.getMetaData(), true);
    await setRecordDto(newModel);
  }
}

export async function persistNewRecord(model, toastContext, showSuccessToasts, createRecord, lenient, showErrorToastsInline = true, isIncomplete) {
  try {
    const isModelValid = model.isModelValid();
    if (!isModelValid && !lenient) {
      const errors = model.getErrors();
      console.error(JSON.stringify(errors));

      if (showErrorToastsInline) {
        toastContext.showInlineFormValidationError(errors && errors.length > 0 ? errors[0] : undefined);
      }
      else {
        toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      }
      return false;
    }

    let response = await createRecord();

    if (showSuccessToasts) {
      if (isIncomplete === true || (lenient && !isModelValid)) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(model.getType());
      } else {
        toastContext.showCreateSuccessResultDialog(model.getType());
      }
    }
    return response;
  } catch (error) {
    console.error(error);

    if (showErrorToastsInline) {
      toastContext.showInlineCreateFailureResultDialog(model.getType(), error);
    }
    else {
      toastContext.showCreateFailureResultDialog(model.getType(), error);
    }

    return false;
  }
}

export async function persistUpdatedRecord(model, toastContext, showSuccessToasts, updateRecord, lenient, showIncompleteDataMessage, setModel, isIncomplete) {
  try {
    if (model == null) {
      return false;
    }

    const isModelValid = model?.isModelValid();
    if (isModelValid !== true && lenient !== true) {
      const errors = model.getErrors();
      console.error(JSON.stringify(errors));
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await updateRecord();

    if (showSuccessToasts) {
      if ((isIncomplete === true || (lenient && !isModelValid)) && showIncompleteDataMessage !== false) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(model.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(model.getType());
      }
    }
    model.clearChangeMap();

    if (setModel) {
      setModel({...model});
    }

    return response;
  }
  catch (error) {
    console.error(error);
    toastContext.showUpdateFailureResultDialog(model?.getType(), error);
  }
}

export async function modalPersistUpdatedRecord(model, toastContext, showSuccessToasts, updateRecord, lenient, handleClose) {
  try {
    if (model == null) {
      return false;
    }

    let isModelValid = model.isModelValid();
    if(!isModelValid && !lenient) {
      let errors = model.getErrors();
      console.error(JSON.stringify(errors));
      toastContext.showInlineFormValidationError(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await updateRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(model.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(model.getType());
      }
    }
    model.clearChangeMap();
    handleClose();
    return response;
  }
  catch (error) {
    console.error(error);
    toastContext.showInlineUpdateFailureMessage(model.getType(), error);
  }
}

