export async function loadSection121DataOutlet(pageProxy, qcItem121, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section121 = FormSectionedTable.getSection('Section121FormOutlet');
        if (!Section121) {
            throw new Error("Section121FormOutlet not found in FormSectionedTable.");
        }

        await Section121.setVisible(true);

        const nextButton = Section121.getControl('Section123NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
            
            if (flags?.next === false) {
              
                const Section41Form = FormSectionedTable.getSection('Section121StaticImageOutlet');
                if (Section41Form) {
                    await Section41Form.setVisible(true);
                }
                  const Section121UserInputImageOutlet = FormSectionedTable.getSection('Section121UserInputImageOutlet');
                if (Section121UserInputImageOutlet) {
                    await Section121UserInputImageOutlet.setVisible(true);
                }
            }
           
        }

        const Section121Date31Control = Section121.getControl('Section121DateOutlet');
        if (Section121Date31Control && qcItem121.DATE_INSPECTED) {
            await Section121Date31Control.setValue(qcItem121.DATE_INSPECTED); 
        }

        const Section121InspectedBy31Control = Section121.getControl('Section121InspectedByOutlet');
        if (Section121InspectedBy31Control && qcItem121.INSPECTED_BY) {
            await Section121InspectedBy31Control.setValue([qcItem121.INSPECTED_BY]);
        }

        const Section121InspectionMethod31Control = Section121.getControl('Section121MethodOutlet');
        if (Section121InspectionMethod31Control && qcItem121.METHOD) {
            await Section121InspectionMethod31Control.setValue(qcItem121.METHOD);
        }

        const Section121DecisionTaken31Control = Section121.getControl('Section121DecisionTakenOutlet');
        if (Section121DecisionTaken31Control && qcItem121.DECISION_TAKEN) {
            await Section121DecisionTaken31Control.setValue([qcItem121.DECISION_TAKEN]);
        }
   // ✅ Dynamic Image Logic
        const dynamicImageSection = FormSectionedTable.getSection('Section121DynamicImageOutlet');
        const userInputImageSection = FormSectionedTable.getSection('Section121UserInputImageOutlet');
         FormSectionedTable.getSection('Section121ImageOutlet').setVisible(true);
        const binding = pageProxy.getBindingObject();

        if (dynamicImageSection && attachments.length > 0) {
            const firstAttachment = attachments[0];
            const base64 = firstAttachment?.file;
            const mimeType = firstAttachment?.mimeType || 'image/png';

            if (base64 && base64.length > 100) {
                binding.imageUri = `data:${mimeType};base64,${base64}`;
                await dynamicImageSection.setVisible(true);
                await dynamicImageSection.redraw();

                // Hide user input image section
                if (userInputImageSection) {
                    await userInputImageSection.setVisible(false);
                }
            } else {
                binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
                await dynamicImageSection.setVisible(false);
                await dynamicImageSection.redraw();

                // Show user input image section
                if (userInputImageSection) {
                    await userInputImageSection.setVisible(true);
                }
            }
        } else {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            // Show user input image section
            if (userInputImageSection) {
                await userInputImageSection.setVisible(true);
            }
        }
        
         FormSectionedTable.getSection('Section122FormOutlet').setVisible(true);

    
    } catch (error) {
        console.error("Error in loadSection121DataOutlet:", error);
    }
}
