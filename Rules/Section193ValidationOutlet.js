/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section193ValidationOutlet(clientAPI) {
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

        const Section193 = FormSectionedTable.getSection('Section193FormOutlet');
        const decisionTakenCtrl = Section193.getControl('Section193DecisionTaken');
        const inspectedByCtrl = Section193.getControl('Section193InspectedBy');
        const inspectionMethodCtrl = Section193.getControl('Section193Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section193UserInputImage1 =FormSectionedTable.getSection('Section194FormOutlet');
    Section193UserInputImage1.setVisible('true');
    // const Section193TakePhoto =FormSectionedTable.getSection('Section193UserInputForm');
    // Section193TakePhoto.setVisible('true');
    FormSectionedTable.getSection('Section193FormOutlet').getControl('Section194NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section193CreateOutlet.action'
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
                Message: 'Unexpected error during Section 19.3 validation. Please try again.'
            }
        });
    }
}

