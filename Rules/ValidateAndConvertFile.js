export default async function ValidateAndConvertFile(clientAPI) {
    const pageProxy = clientAPI.getPageProxy();
    console.log("🚀 [ValidateAndConvertFile] Started validation and conversion process.");

    try {
        const formSectionedTable = pageProxy.getControl('FormSectionedTable');
        // console.log("✅ [ValidateAndConvertFile] Retrieved FormSectionedTable:", formSectionedTable);

        const attachmentControl = formSectionedTable.getControl('uploadPdf');
        // console.log("✅ [ValidateAndConvertFile] Retrieved attachment control:", attachmentControl);

        const attachments = attachmentControl.getValue();
        // console.log("📂 [ValidateAndConvertFile] Attachments found:", attachments);

        if (!attachments || attachments.length === 0) {
            // console.warn("⚠️ [ValidateAndConvertFile] No attachments found.");
            await clientAPI.executeAction({
                Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
                Properties: {
                    Title: "Missing Attachment",
                    Message: "Please upload at least one valid PDF file before proceeding.",
                    OKCaption: "OK"
                }
            });
            return null;
        }

        const uploadedFiles = [];

        for (let i = 0; i < attachments.length; i++) {
            const file = attachments[i];
            // console.log(`📄 [ValidateAndConvertFile] Processing file ${i + 1}:`, file);

            if (!file.content || file.content.byteLength === 0) {
                // console.warn(`⚠️ [ValidateAndConvertFile] File ${i + 1} is empty. File details:`, file);
                await clientAPI.executeAction({
                    Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
                    Properties: {
                        Title: "Empty File",
                        Message: `One or more uploaded files are empty. Please remove them and try again.`,
                        OKCaption: "OK"
                    }
                });
                return null;
            }

            const base64Content = arrayBufferToBase64(file.content);
            // console.log(`✅ [ValidateAndConvertFile] Converted file ${i + 1} to base64.`);

            uploadedFiles.push({
                base64: base64Content,
                name: file.urlString || 'UploadedFile.pdf',
                mimeType: file.contentType || 'application/pdf',
                size: file.content.byteLength
            });
        }

        // console.log("📦 [ValidateAndConvertFile] Uploaded files ready for processing:", uploadedFiles);

        clientAPI.getClientData().uploadedFiles = uploadedFiles;
        // console.log("✅ [ValidateAndConvertFile] Saved uploaded files in client data.");

        return clientAPI.executeAction({
            Name: "/TRL_Snorkel_Digitization_TSL/Actions/HeaderCreate.action"
        });

    } catch (error) {
        // console.error("❌ [ValidateAndConvertFile] Error occurred:", error);

        await clientAPI.executeAction({
            Name: "/TRL_Snorkel_Digitization_TSL/Actions/AttachmnetValidation.action",
            Properties: {
                Title: "Unexpected Error",
                Message: "An unexpected error occurred while processing the files. Please try again.",
                OKCaption: "OK"
            }
        });
        return null;
    }
}

function arrayBufferToBase64(buffer) {
    // console.log("🔄 [arrayBufferToBase64] Converting ArrayBuffer to base64. Buffer length:", buffer?.byteLength);
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    // console.log("✅ [arrayBufferToBase64] Conversion complete. Base64 length:", base64.length);
    return base64;
}
