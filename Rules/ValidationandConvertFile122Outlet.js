/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default async function ValidateAndConvertFile122Outlet(clientAPI) {
    const pageProxy = clientAPI.getPageProxy();

    try {
        const sectionedTable = pageProxy.getControl('FormSectionedTable');

        const snorkelNo = sectionedTable
            .getSection('HeaderSection')
            ?.getControl('SnorkelNo')
            ?.getValue();

        const photoSection = sectionedTable.getSection('Section122UserInputImageOutlet');
        const photoControl = photoSection?.getControl('Section122TakePhotoOutlet');
        const attachments = photoControl?.getValue();

        const question = sectionedTable
            .getSection('Section122FormOutlet')
            .getControl('Section122QuestionOutlet')
            .getValue();

        // Validate attachment
        if (!attachments || attachments.length === 0 || !attachments[0].content) {
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

        // Limit to one file
        if (attachments.length > 1) {
            photoControl.setValue([attachments[0]]); // Keep only the first

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
        const base122Content = arrayBufferToBase122(file.content);
        const uploadedFile = {
            base122: base122Content,
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
                    file: uploadedFile.base122,
                    size: uploadedFile.size,
                    qC_HEADER_SNORKEL_NO: snorkelNo
                }
            }
        });

       
       sectionedTable.getSection('Section122TestFormNameOutlet').setVisible(true);
       sectionedTable.getSection('Section122TestFormOutlet').setVisible(true);

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

function arrayBufferToBase122(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
