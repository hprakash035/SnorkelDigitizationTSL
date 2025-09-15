/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section151ValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        //  const headerSection = FormSectionedTable.getSection('HeaderSection');
        // const snorkelNoControl = headerSection.getControl('SnorkelNo');
        // const snorkelNo = snorkelNoControl.getValue();

       
        const Section151 = FormSectionedTable.getSection('Section151FormOutlet');
        const decisionTakenCtrl = Section151.getControl('Section151DecisionTaken');
        const inspectedByCtrl = Section151.getControl('Section151InspectedBy');
        const inspectionMethodCtrl = Section151.getControl('Section151Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section151UserInputImage1 =FormSectionedTable.getSection('Section161FormOutlet');
    Section151UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section151FormOutlet').getControl('Section161NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section151CreateOutlet.action'
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
                Message: 'Unexpected error during Section 15.1 validation. Please try again.'
            }
        });
    }
}

