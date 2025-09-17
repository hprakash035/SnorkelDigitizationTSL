/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section152Validation(clientAPI) {
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

        const Section152 = FormSectionedTable.getSection('Section152Form');
        const decisionTakenCtrl = Section152.getControl('Section152DecisionTaken');
        const inspectedByCtrl = Section152.getControl('Section152InspectedBy');
        const inspectionMethodCtrl = Section152.getControl('Section152Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section152UserInputImage1 =FormSectionedTable.getSection('Section152TestForm');
    Section152UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section152TestName').setVisible(true);
    FormSectionedTable.getSection('Section152Form').getControl('Section152TestNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section152Create.action'
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
                Message: 'Unexpected error during Section 15.2 validation. Please try again.'
            }
        });
    }
}

