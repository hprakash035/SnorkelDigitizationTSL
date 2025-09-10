export async function loadSection122DataInlet(pageProxy, qcItem122, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section122 = FormSectionedTable.getSection('Section122FormInlet');
        if (!Section122) {
            throw new Error("Section122Forminlet not found in FormSectionedTable.");
        }

        await Section122.setVisible(true);

        const nextButton = Section122.getControl('Section123NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
            
            if (flags?.next === false) {
              
                const Section41Form = FormSectionedTable.getSection('Section122StaticImageInlet');
                if (Section41Form) {
                    await Section41Form.setVisible(true);
                }
                  const Section122UserInputImageInlet = FormSectionedTable.getSection('Section122UserInputImageInlet');
                if (Section122UserInputImageInlet) {
                    await Section122UserInputImageInlet.setVisible(true);
                }
            }
           
        }

        const Section122Date31Control = Section122.getControl('Section122DateInlet');
        if (Section122Date31Control && qcItem122.DATE_INSPECTED) {
            await Section122Date31Control.setValue(qcItem122.DATE_INSPECTED); 
        }

        const Section122InspectedBy31Control = Section122.getControl('Section122InspectedByInlet');
        if (Section122InspectedBy31Control && qcItem122.INSPECTED_BY) {
            await Section122InspectedBy31Control.setValue([qcItem122.INSPECTED_BY]);
        }

        const Section122InspectionMethod31Control = Section122.getControl('Section122MethodInlet');
        if (Section122InspectionMethod31Control && qcItem122.METHOD) {
            await Section122InspectionMethod31Control.setValue(qcItem122.METHOD);
        }

        const Section122DecisionTaken31Control = Section122.getControl('Section122DecisionTakenInlet');
        if (Section122DecisionTaken31Control && qcItem122.DECISION_TAKEN) {
            await Section122DecisionTaken31Control.setValue([qcItem122.DECISION_TAKEN]);
        }
   // ✅ Dynamic Image Logic
        const dynamicImageSection = FormSectionedTable.getSection('Section122DynamicImageInlet');
        const userInputImageSection = FormSectionedTable.getSection('Section122UserInputImageInlet');
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

    
    } catch (error) {
        console.error("Error in loadSection122DataInlet:", error);
    }
}
