/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function Section123Validation(clientAPI) {
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

        const Section123 = FormSectionedTable.getSection('Section123FormOutlet');
        const decisionTakenCtrl = Section123.getControl('Section123DecisionTakenOutlet');
        const inspectedByCtrl = Section123.getControl('Section123InspectedByOutlet');
        const inspectionMethodCtrl = Section123.getControl('Section123MethodOutlet');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
            const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
  
   
    FormSectionedTable.getSection('Section123FormOutlet').getControl('Section123NextOutlet').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section123CreateOutlet.action'
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
                Message: 'Unexpected error during Section 12.3 validation. Please try again.'
            }
        });
    }
}

