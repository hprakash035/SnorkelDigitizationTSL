export async function loadSection174DataOutlet(pageProxy, qcItem174, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section174 = FormSectionedTable.getSection('Section174FormOutlet');
        if (!Section174) {
            throw new Error("Section174Form not found in FormSectionedTable.");
        }

        await Section174.setVisible(true);

        // ---------------------------
        // Hide Next Button
        // ---------------------------
        const nextButton = Section174.getControl('Section174StaticNextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section174StaticImage = FormSectionedTable.getSection('Section174StaticImageOutlet');
                if (Section174StaticImage) {
                    await Section174StaticImage.setVisible(true);
                }
                const Section174UserInputImageOutlet = FormSectionedTable.getSection('Section174UserInputImageOutlet');
                if (Section174UserInputImageOutlet) {
                    await Section174UserInputImageOutlet.setVisible(true);
                }
            }
        }

        // ---------------------------
        // Populate form data
        // ---------------------------
        let hasData = false;

        const Section174Date = Section174.getControl('Section174Date');
        if (Section174Date && qcItem174.DATE_INSPECTED) {
            await Section174Date.setValue(qcItem174.DATE_INSPECTED);
            hasData = true;
        }

        const Section174InspectedBy = Section174.getControl('Section174InspectedBy');
        if (Section174InspectedBy && qcItem174.INSPECTED_BY) {
            await Section174InspectedBy.setValue([qcItem174.INSPECTED_BY]);
            hasData = true;
        }

        const Section174Method = Section174.getControl('Section174Method');
        if (Section174Method && qcItem174.METHOD) {
            await Section174Method.setValue(qcItem174.METHOD);
            hasData = true;
        }

        const Section174DecisionTaken = Section174.getControl('Section174DecisionTaken');
        if (Section174DecisionTaken && qcItem174.DECISION_TAKEN) {
            await Section174DecisionTaken.setValue([qcItem174.DECISION_TAKEN]);
            hasData = true;
        }

        // ---------------------------
        // Handle image sections only if form has data
        // ---------------------------
        const dynamicImageSection = FormSectionedTable.getSection('Section174DynamicImageOutlet');
        const userInputImageSection = FormSectionedTable.getSection('Section174UserInputImageOutlet');
        const binding = pageProxy.getBindingObject();

        let hasDynamicImage = false;
        let hasUserInputImage = false;

        if (hasData) {
            if (dynamicImageSection && attachments.length > 0) {
                const firstAttachment = attachments[0];
                const base64 = firstAttachment?.file;
                const mimeType = firstAttachment?.mimeType || 'image/png';

                if (base64 && base64.length > 100) {
                    binding.imageUri = `data:${mimeType};base64,${base64}`;
                    await dynamicImageSection.setVisible(true);
                    await dynamicImageSection.redraw();
                    hasDynamicImage = true;
 FormSectionedTable.getSection('Section181FormOutlet').setVisible(true);;
                    if (userInputImageSection) {
                        await userInputImageSection.setVisible(false);
                    }
                } else {
                    binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
                    await dynamicImageSection.setVisible(false);
                    await dynamicImageSection.redraw();

                    if (userInputImageSection) {
                        await userInputImageSection.setVisible(true);
                        hasUserInputImage = true;
                    }
                }
            } else {
                binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
                await dynamicImageSection?.setVisible(false);
                await dynamicImageSection?.redraw();

                if (userInputImageSection) {
                    await userInputImageSection.setVisible(true);
                    hasUserInputImage = true;
                    

                }
            }
        } else {
            // no form data → hide both image sections
            await dynamicImageSection?.setVisible(false);
            await userInputImageSection?.setVisible(false);
        }

      
    } catch (error) {
        // console.error("Error in loadSection174Data:", error);
    }
}
