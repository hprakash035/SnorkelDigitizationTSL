/**
 * Validate and convert file for Section 212
 * @param {IClientAPI} clientAPI
 */
export default async function ValidateAndConvertFile212(clientAPI) {
  const pageProxy = clientAPI.getPageProxy();
  const binding = pageProxy.getBindingObject();

  try {
    const sectionedTable = pageProxy.getControl('FormSectionedTable');
    const snorkelNo = clientAPI.binding.SNORKEL_NO;

    const photoSection = sectionedTable.getSection('Section212UserInputForm');
    const photoControl = photoSection?.getControl('Section212TakePhoto');
    const attachments = photoControl?.getValue() || [];

    const question = "21.2 Preventing the floating of snorkel";

    // --- Validation: Only one file allowed ---
    if (attachments.length > 1) {
      photoControl.setValue([attachments[0]]);
      await clientAPI.executeAction({
        Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
        Properties: {
          Title: "Only One File Allowed",
          Message: "Only one file is allowed. Extra files were removed.",
          OKCaption: "OK"
        }
      });
      return null;
    }

    if (!attachments || attachments.length === 0) {
      return null;
    }

    const file = attachments[0];
    const base64Content = arrayBufferToBase64(file.content);

    const uploadedFile = {
      base64: base64Content,
      name: file.urlString || 'UploadedFile.pdf',
      mimeType: file.contentType || 'application/pdf',
      size: file.content.byteLength
    };

    clientAPI.getClientData().uploadedFile = uploadedFile;

    await clientAPI.executeAction({
      Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmentCreate.action",
      Properties: {
        Properties: {
          question: question,
          mimeType: uploadedFile.mimeType,
          name: uploadedFile.name,
          file: uploadedFile.base64,
          size: uploadedFile.size,
          qC_HEADER_SNORKEL_NO: snorkelNo
        }
      }
    });

    // ✅ Show next section
    sectionedTable.getSection('Section213Form').setVisible(true);

  } catch (error) {
    await clientAPI.executeAction({
      Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
      Properties: {
        Title: "Unexpected Error",
        Message: "An unexpected error occurred while uploading the file. Please try again.",
        OKCaption: "OK"
      }
    });
    return null;
  }
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
