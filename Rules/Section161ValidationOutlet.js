/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section161ValidationOutlet(clientAPI) {
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

        const Section161 = FormSectionedTable.getSection('Section161FormOutlet');
        const decisionTakenCtrl = Section161.getControl('Section161DecisionTaken');
        const inspectedByCtrl = Section161.getControl('Section161InspectedBy');
        const inspectionMethodCtrl = Section161.getControl('Section161Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section161UserInputImage1 =FormSectionedTable.getSection('Section162FormOutlet');
    Section161UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section161FormOutlet').getControl('Section162NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section161CreateOutlet.action'
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
                Message: 'Unexpected error during Section 16.1 validation. Please try again.'
            }
        });
    }
}

