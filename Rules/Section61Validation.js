/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section61Validation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
         const headerSection = FormSectionedTable.getSection('HeaderSection');
        const snorkelNoControl = headerSection.getControl('SnorkelNo');
        const snorkelNo = snorkelNoControl.getValue();

        if (!snorkelNo) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            });
        }

        const Section61 = FormSectionedTable.getSection('Section61Form');
        const decisionTakenCtrl = Section61.getControl('Section61DecisionTaken');
        const inspectedByCtrl = Section61.getControl('Section61InspectedBy');
        const inspectionMethodCtrl = Section61.getControl('Section61Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
           

            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section61Create.action'
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
                Message: 'Unexpected error during Section 6.1 validation. Please try again.'
            }
        });
    }
}

