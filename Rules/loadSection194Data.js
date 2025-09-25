export async function loadSection194Data(pageProxy, qcItem194, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const section194 = FormSectionedTable.getSection('Section194Form');
        if (!section194) {
            throw new Error("Section194Form not found.");
        }

        const nextButton = section194.getControl('Section195NextButton');

        // ✅ Determine if metadata is available (you can customize this condition)
        // const hasMetaData = qcItem194?.DATE_INSPECTED || qcItem194?.INSPECTED_BY || qcItem194?.METHOD || qcItem194?.DECISION_TAKEN;

        if (nextButton) {
            await nextButton.setVisible(false); // Hide if metadata is available
        }

        await section194.setVisible(true);

        if (qcItem194?.DATE_INSPECTED) {
            const dateControl = section194.getControl('Section194Date');
            if (dateControl) {
                await dateControl.setValue(qcItem194.DATE_INSPECTED);
            }
        }

        if (qcItem194?.INSPECTED_BY) {
            const inspectedByControl = section194.getControl('Section194InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem194.INSPECTED_BY);
            }
            
      
            await nextButton.setVisible(false); // Hide if metadata is available
        
        }

        if (qcItem194?.METHOD) {
            const methodControl = section194.getControl('Section194Method');
            if (methodControl) {
                await methodControl.setValue(qcItem194.METHOD);
            }
        }

        if (qcItem194?.DECISION_TAKEN) {
            const decisionControl = section194.getControl('Section194DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem194.DECISION_TAKEN);
            }
        }

        const dynamicImageSection = FormSectionedTable.getSection('Section195DynamicImage');
        const userInputImageSection = FormSectionedTable.getSection('Section195UserInputImage');
        const staticImageSection = FormSectionedTable.getSection('Section195StaticImage');

        await userInputImageSection?.setVisible(true);
        await staticImageSection?.setVisible(true);

        const binding = pageProxy.getBindingObject();

        if (dynamicImageSection && attachments.length > 0) {
            const firstAttachment = attachments[0];
            const base64 = firstAttachment?.file;
            const mimeType = firstAttachment?.mimeType || 'image/png';

            if (base64 && base64.length > 100) {
                binding.imageUri = `data:${mimeType};base64,${base64}`;
                await dynamicImageSection.setVisible(true);
                await dynamicImageSection.redraw();

                if (userInputImageSection) {
                    await userInputImageSection.setVisible(false);
                }
            } else {
                binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
                await dynamicImageSection.setVisible(false);
                await dynamicImageSection.redraw();

                if (userInputImageSection) {
                    await userInputImageSection.setVisible(true);
                }
            }

            FormSectionedTable.getSection('Section136Form').setVisible(true);
        } else {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            if (userInputImageSection) {
                await userInputImageSection.setVisible(true);
            }
        }

    } catch (error) {
        // Handle errors appropriately
        console.error("Error loading Section194 data:", error);
    }
}
