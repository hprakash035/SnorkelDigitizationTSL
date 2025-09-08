/**
 * Validate and convert file for Section 113
 * @param {IClientAPI} clientAPI
 */
export default async function ValidateAndConvertFile113(clientAPI) {
  const pageProxy = clientAPI.getPageProxy();
  const binding = pageProxy.getBindingObject();
  console.log("🚀 ValidateAndConvertFile113 started | Binding:", binding);

  try {
    const sectionedTable = pageProxy.getControl('FormSectionedTable');
    const snorkelNo = clientAPI.binding.SNORKEL_NO;
    console.log("🔑 SNORKEL_NO:", snorkelNo);
    const type = clientAPI.binding.TYPE;
    console.log("🔑 TYPE:", type);

    const photoSection = sectionedTable.getSection('Section113UserInputImage');
    const photoControl = photoSection?.getControl('Section113TakePhoto');
    const attachments = photoControl?.getValue() || [];
    console.log("📎 Attachments found:", attachments);

    const question = sectionedTable
      .getSection('Section113Form')
      .getControl('Section113Question')
      .getValue();
    console.log("❓ Question value:", question);

    // Validate attachment
    if (!attachments || attachments.length === 0 || !attachments[0].content) {
      console.warn("⚠️ Invalid attachment. No file or missing content.");
      await clientAPI.executeAction({
        Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
        Properties: {
          Title: "Invalid Attachment",
          Message: "Please upload exactly one valid file before proceeding.",
          OKCaption: "OK"
        }
      });
      return null;
    }

    // Allow only 1 file
    if (attachments.length > 1) {
      console.warn("⚠️ Multiple attachments detected. Keeping only the first.");
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

    const file = attachments[0];
    console.log("📄 Processing file:", {
      urlString: file.urlString,
      mimeType: file.contentType,
      size: file.content?.byteLength
    });

    const base64Content = arrayBufferToBase64(file.content);
    console.log("🔄 Converted file to base64, length:", base64Content?.length);

    const uploadedFile = {
      base64: base64Content,
      name: file.urlString || 'UploadedFile.pdf',
      mimeType: file.contentType || 'application/pdf',
      size: file.content.byteLength
    };
    console.log("📦 UploadedFile object prepared:", uploadedFile);

    clientAPI.getClientData().uploadedFile = uploadedFile;

    console.log("📤 Executing AttachmentCreate113.action...");
    await clientAPI.executeAction({
      Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmentCreate113.action",
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

    // ✅ Show next section based on TYPE
    const normalizedType = (type || "").toLowerCase();

    const sectionInlet = sectionedTable.getSection('Section121FormInlet');
    const sectionOutlet = sectionedTable.getSection('Section121FormOutlet');

    if (normalizedType === "inlet") {
      if (sectionInlet) {
        console.log("✅ TYPE=inlet. Showing Section121FormInlet...");
        await sectionInlet.setVisible(true);
      }
      if (sectionOutlet) {
        console.log("🚫 Hiding Section121FormOutlet...");
        await sectionOutlet.setVisible(false);
      }
    } else if (normalizedType === "outlet") {
      if (sectionOutlet) {
        console.log("✅ TYPE=outlet. Showing Section121FormOutlet...");
        await sectionOutlet.setVisible(true);
      }
      if (sectionInlet) {
        console.log("🚫 Hiding Section121FormInlet...");
        await sectionInlet.setVisible(false);
      }
    } else {
      console.warn(`⚠️ Unknown TYPE '${type}'. No section shown.`);
    }

    console.log("🏁 ValidateAndConvertFile113 completed successfully");

  } catch (error) {
    console.error("💥 Error in ValidateAndConvertFile113:", error);
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
  console.log("🧩 Converting ArrayBuffer to base64...");
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  console.log("🔄 Conversion complete. Base64 length:", base64.length);
  return base64;
}
