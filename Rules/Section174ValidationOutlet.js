/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section174ValidationOutlet(clientAPI) {
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

        const Section174 = FormSectionedTable.getSection('Section174FormOutlet');
        const decisionTakenCtrl = Section174.getControl('Section174DecisionTaken');
        const inspectedByCtrl = Section174.getControl('Section174InspectedBy');
        const inspectionMethodCtrl = Section174.getControl('Section174Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section174UserInputImage1 =FormSectionedTable.getSection('Section174StaticImageOutlet');
    Section174UserInputImage1.setVisible('true');
    
    const Section174UserInputImageOutlet =FormSectionedTable.getSection('Section174UserInputImageOutlet');
    Section174UserInputImageOutlet.setVisible('true');
    FormSectionedTable.getSection('Section174FormOutlet').getControl('Section174StaticNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section174CreateOutlet.action'
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
                Message: 'Unexpected error during Section 17.3 validation. Please try again.'
            }
        });
    }
}

