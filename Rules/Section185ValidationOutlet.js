/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section185ValidationOutlet(clientAPI) {
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

        const Section185 = FormSectionedTable.getSection('Section185FormOutlet');
        const decisionTakenCtrl = Section185.getControl('Section185DecisionTaken');
        const inspectedByCtrl = Section185.getControl('Section185InspectedBy');
        const inspectionMethodCtrl = Section185.getControl('Section185Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section185UserInputImage1 =FormSectionedTable.getSection('Section191FormOutlet');
    Section185UserInputImage1.setVisible('true');
    
    // const Section185UserInputImageOutlet =FormSectionedTable.getSection('Section185UserInputImageOutlet');
    // Section185UserInputImageOutlet.setVisible('true');
     FormSectionedTable.getSection('Section185FormOutlet').getControl('Section191NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section185CreateOutlet.action'
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

