/**
 * Section 194 Validation and make Section 205 controls visible
 * @param {IClientAPI} clientAPI
 */
export default function Section194Validation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        const Section194 = FormSectionedTable.getSection('Section194FormOutlet');
        const decisionTakenCtrl = Section194.getControl('Section194DecisionTaken');
        const inspectedByCtrl = Section194.getControl('Section194InspectedBy');
        const inspectionMethodCtrl = Section194.getControl('Section194Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        // if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken !== "") {

        //     // ✅ Make Section 205 parts visible
        //     const sectionIDs = [
        //         'Section205AStaticImageInlet',
        //         'Section205BStaticImageInlet',
        //         'Section205MeasureName',
        //         'Section205QCMeasurements',
        //         'Section205Casting',
        //         'Section205CastingForm',
        //         'Section205CastingRemarkStatusFormA',
        //         'Section205CastingRemarkStatusFormB',
        //         'Section205Check',
        //         'Section205CheckForm',
        //         'Section205CheckRemark',
        //         'Section205CheckRemarkBSnorkelLot',
        //         'Section205UserInputImageA',
        //         'Section205UserInputImageB'
        //     ];

        //     sectionIDs.forEach(id => {
        //         const section = FormSectionedTable.getSection(id);
        //         if (section) {
        //             section.setVisible(true);
        //         }
        //     });

            // Example: hide Next button if needed
            Section194.getControl('SectionFinalNextButton')?.setVisible(false);

             clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2FinalInspection.action'
            });
 return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section194CreateOutlet.action'
            });

        // } else {
        //     return clientAPI.executeAction({
        //         Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
        //     });
        // }

    } catch (error) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 19.4 validation. Please try again.'
            }
        });
    }
}
