/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function Section121ValidationOutlet(clientAPI) {
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

        const Section121 = FormSectionedTable.getSection('Section121FormOutlet');
        const decisionTakenCtrl = Section121.getControl('Section121DecisionTakenOutlet');
        const inspectedByCtrl = Section121.getControl('Section121InspectedByOutlet');
        const inspectionMethodCtrl = Section121.getControl('Section121MethodOutlet');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
            const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
  
    const Section121ImageOutlet =FormSectionedTable.getSection('Section121ImageOutlet');
    Section121ImageOutlet.setVisible('true');
     const Section121UserInputImageOutlet =FormSectionedTable.getSection('Section121UserInputImageOutlet');
    Section121UserInputImageOutlet.setVisible('true');
    FormSectionedTable.getSection('Section121FormOutlet').getControl('Section122NextButtonOutlet').setVisible(false);
   
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section121CreateOutlet.action'
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
                Message: 'Unexpected error during Section 12.1 validation. Please try again.'
            }
        });
    }
}

