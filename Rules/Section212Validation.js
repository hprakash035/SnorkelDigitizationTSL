/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section212Validation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        //  const headerSection = FormSectionedTable.getSection('HeaderSection');
        // const snorkelNoControl = headerSection.getControl('SnorkelNo');
        // const snorkelNo = snorkelNoControl.getValue();

        // if (!snorkelNo) {
        //     return clientAPI.executeAction({
        //         Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
        //     });
        // }

        const Section212 = FormSectionedTable.getSection('Section212Form');
        const decisionTakenCtrl = Section212.getControl('Section212DecisionTaken');
        const inspectedByCtrl = Section212.getControl('Section212InspectedBy');
        const inspectionMethodCtrl = Section212.getControl('Section212Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    // const Section212UserInputImage1 =FormSectionedTable.getSection('Section191Form');
    // Section212UserInputImage1.setVisible('true');
    // FormSectionedTable.getSection('Section212Form').getControl('Section191NextButton').setVisible(false);

    
    const Section212UserInputImage1 =FormSectionedTable.getSection('Section212StaticImage');
    Section212UserInputImage1.setVisible('true');
     const Section212UserInputImage =FormSectionedTable.getSection('Section212UserInputForm');
    Section212UserInputImage.setVisible('true');
    FormSectionedTable.getSection('Section212Form').getControl('Section212StaticNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section212Create.action'
            });
           
        } else {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 18.4 validation. Please try again.'
            }
        });
    }
}

