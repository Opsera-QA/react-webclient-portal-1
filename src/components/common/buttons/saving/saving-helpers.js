import Model from "core/data_model/model";

export async function persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && recordDto.getDetailViewLink != null && history != null) {
    let updatedDto = new Model(response?.data, recordDto.getMetaData(), false);
    let link = updatedDto.getDetailViewLink();

    if (link != null) {
      history.push(link);
    }
  }
}

export async function persistNewRecordAndClose(recordDto, toastContext, showSuccessToasts, createRecord, lenient, handleClose) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && handleClose) {
    handleClose();
  }
}

export async function persistNewRecordAndAddAnother(recordDto, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && setRecordDto) {
    let newModel = new Model({...recordDto.getNewObjectFields()}, recordDto.getMetaData(), true);
    await setRecordDto(newModel);
  }
}

export async function persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, showErrorToastsInline = true) {
  try {
    let isModelValid = recordDto.isModelValid2();
    if (!isModelValid && !lenient) {
      let errors = recordDto.isModelValid();
      console.error(JSON.stringify(errors));

      if (showErrorToastsInline) {
        toastContext.showInlineFormValidationErrorInline(errors && errors.length > 0 ? errors[0] : undefined);
      }
      else {
        toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      }
      return false;
    }

    let response = await createRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid) {
        toastContext.showIncompleteCreateSuccessResultDialog(recordDto.getType());
      } else {
        toastContext.showCreateSuccessResultDialog(recordDto.getType());
      }
    }
    return response;
  } catch (error) {
    console.error(error);

    if (showErrorToastsInline) {
      toastContext.showInlineCreateFailureResultDialog(recordDto.getType(), error);
    }
    else {
      toastContext.showCreateFailureResultDialog(recordDto.getType(), error)
    }

    return false;
  }
}

export async function persistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient) {
  try {
    let isModelValid = recordDto.isModelValid2();
    if(!isModelValid && !lenient) {
      let errors = recordDto.isModelValid();
      console.error(JSON.stringify(errors));
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await updateRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid) {
        toastContext.showIncompleteCreateSuccessResultDialog(recordDto.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(recordDto.getType());
      }
    }
    recordDto.clearChangeMap();
    return response;
  }
  catch (error) {
    console.error(error);
    toastContext.showUpdateFailureResultDialog(recordDto.getType(), error);
  }
}

