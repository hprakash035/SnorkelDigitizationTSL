export default function Section12Validation(clientAPI) {
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

        const Section12 = FormSectionedTable.getSection('Section12Form');
        const decisionTakenCtrl = Section12.getControl('Section12DecisionTaken');
        const inspectedByCtrl = Section12.getControl('Section12InspectedBy');
        const inspectionMethodCtrl = Section12.getControl('Section12InspectionMethod');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != ""  && inspectedBy !="") {
            const Section2 = FormSectionedTable.getSection('Section2Form');
 
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section12Create.action'
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
                Message: 'Unexpected error during Section 12 validation. Please try again.'
            }
        });
    }
}
