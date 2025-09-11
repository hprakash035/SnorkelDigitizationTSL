export async function loadSection123DataOutlet(pageProxy, qcItem123, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section123 = FormSectionedTable.getSection('Section123FormOutlet');
        if (!Section123) {
            throw new Error("Section123Form not found in FormSectionedTable.");
        }

        await Section123.setVisible(true);

        const nextButton = Section123.getControl('Section123NextOutlet');
        if (nextButton) {
            await nextButton.setVisible(false);
            
            if (flags?.next === false) {
              
                // const Section41Form = FormSectionedTable.getSection('Section123StaticImage');
                // if (Section41Form) {
                //     await Section41Form.setVisible(true);
                // }
                //   const Section41Form1 = FormSectionedTable.getSection('Section123UserInputImage');
                // if (Section41Form) {
                //     await Section41Form1.setVisible(true);
                // }
                
            }
           
        }

        const Section123Date31Control = Section123.getControl('Section123DateOutlet');
        if (Section123Date31Control && qcItem123.DATE_INSPECTED) {
            await Section123Date31Control.setValue(qcItem123.DATE_INSPECTED); 
        }

        const Section123InspectedBy31Control = Section123.getControl('Section123InspectedByOutlet');
        if (Section123InspectedBy31Control && qcItem123.INSPECTED_BY) {
            await Section123InspectedBy31Control.setValue([qcItem123.INSPECTED_BY]);
        }

        const Section123InspectionMethod31Control = Section123.getControl('Section123MethodOutlet');
        if (Section123InspectionMethod31Control && qcItem123.METHOD) {
            await Section123InspectionMethod31Control.setValue(qcItem123.METHOD);
        }

        const Section123DecisionTaken31Control = Section123.getControl('Section123DecisionTakenOutlet');
        if (Section123DecisionTaken31Control && qcItem123.DECISION_TAKEN) {
            await Section123DecisionTaken31Control.setValue([qcItem123.DECISION_TAKEN]);
        }
      
       
       
          const Section123Form = FormSectionedTable.getSection('Section131FormOutlet');
            if (Section123Form) {
                await Section123Form.setVisible(true);
            }
    } catch (error) {
        console.error("Error in loadSection123Data:", error);
    }
}
