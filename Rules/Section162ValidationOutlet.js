/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section162ValidationOutlet(clientAPI) {
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

        const Section162 = FormSectionedTable.getSection('Section162FormOutlet');
        const decisionTakenCtrl = Section162.getControl('Section162DecisionTaken');
        const inspectedByCtrl = Section162.getControl('Section162InspectedBy');
        const inspectionMethodCtrl = Section162.getControl('Section162Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section162UserInputImage1 =FormSectionedTable.getSection('Section163FormOutlet');
    Section162UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section162FormOutlet').getControl('Section163NextButton').setVisible(false);
      clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section162CreateOutlet.action'
            });




            return   clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2Sheet5.action'
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
                Message: 'Unexpected error during Section 16.2 validation. Please try again.'
            }
        });
    }
}

