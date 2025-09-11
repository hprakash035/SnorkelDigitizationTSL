/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section131ValidationOutlet(clientAPI) {
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

        const Section131 = FormSectionedTable.getSection('Section131FormOutlet');
        const decisionTakenCtrl = Section131.getControl('Section131DecisionTakenOutlet');
        const inspectedByCtrl = Section131.getControl('Section131InspectedByOutlet');
        const inspectionMethodCtrl = Section131.getControl('Section131MethodOutlet');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    
    const Section131UserInputImage1 =FormSectionedTable.getSection('Section131TestFormOutlet');
    Section131UserInputImage1.setVisible('true');
     FormSectionedTable.getSection('Section131TestFormNameOutlet').setVisible(true);
    FormSectionedTable.getSection('Section131FormOutlet').getControl('Section131TestNextButtonOutlet').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131CreateOutlet.action'
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
                Message: 'Unexpected error during Section 13.1 validation. Please try again.'
            }
        });
    }
}

