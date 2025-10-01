/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function Section114Validation(clientAPI) {
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

        const Section114 = FormSectionedTable.getSection('Section114Form');
        const decisionTakenCtrl = Section114.getControl('Section114DecisionTaken');
        const inspectedByCtrl = Section114.getControl('Section114InspectedBy');
        const inspectionMethodCtrl = Section114.getControl('Section114Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
         const type = clientAPI.binding.TYPE;
    const normalizedType = (type || "").toLowerCase();

    const sectionInlet = sectionedTable.getSection('Section121FormInlet');
    const sectionOutlet = sectionedTable.getSection('Section121FormOutlet');

    if (normalizedType === "inlet") {
      if (sectionInlet) {
        sectionInlet.setVisible(true);
      }
      if (sectionOutlet) {
        // console.log("🚫 Hiding Section121FormOutlet...");
         sectionOutlet.setVisible(false);
      }
    } else if (normalizedType === "outlet") {
      if (sectionOutlet) {
        // console.log("✅ TYPE=outlet. Showing Section121FormOutlet...");
       sectionOutlet.setVisible(true);
      }
      if (sectionInlet) {
        // console.log("🚫 Hiding Section121FormInlet...");
       sectionInlet.setVisible(false);
      }
    } else {
      // console.warn(`⚠️ Unknown TYPE '${type}'. No section shown.`);
    }
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section114Create.action'
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
                Message: 'Unexpected error during Section 11.4 validation. Please try again.'
            }
        });
    }
}

