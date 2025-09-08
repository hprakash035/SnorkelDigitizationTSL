
export default function Section111Validation(clientAPI) {
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

        const Section111 = FormSectionedTable.getSection('Section111Form');
        const decisionTakenCtrl = Section111.getControl('Section111DecisionTaken');
        const inspectedByCtrl = Section111.getControl('Section111InspectedBy');
        const inspectionMethodCtrl = Section111.getControl('Section111InspectionMethod');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
           
            FormSectionedTable.getSection('Section111Form').getControl('Section111TestNextButton').setVisible(false);
             const Section111TestFormName =FormSectionedTable.getSection('Section111TestFormName');
            Section111TestFormName.setVisible('true');
            const Section111Form =FormSectionedTable.getSection('Section111TestForm');
            Section111Form.setVisible('true');
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section111Create.action'
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
                Message: 'Unexpected error during Section 111 validation. Please try again.'
            }
        });
    }
}

