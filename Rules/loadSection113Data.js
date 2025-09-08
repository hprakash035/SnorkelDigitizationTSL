export async function loadSection113Data(pageProxy, qcItem113, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section113 = FormSectionedTable.getSection('Section113Form');
        if (!Section113) {
            throw new Error("Section113Form not found in FormSectionedTable.");
        }

        await Section113.setVisible(true);

        const nextButton = Section113.getControl('Section113StaticNextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section113StaticImage = FormSectionedTable.getSection('Section113StaticImage');
                if (Section113StaticImage) {
                    await Section113StaticImage.setVisible(true);
                }
                const Section113UserInputImage = FormSectionedTable.getSection('Section113UserInputImage');
                if (Section113UserInputImage) {
                    await Section113UserInputImage.setVisible(true);
                }
            }
        }

        // Fill values if present
        const Section113Date = Section113.getControl('Section113Date');
        if (Section113Date && qcItem113.DATE_INSPECTED) {
            await Section113Date.setValue(qcItem113.DATE_INSPECTED);
        }

        const Section113InspectedBy = Section113.getControl('Section113InspectedBy');
        if (Section113InspectedBy && qcItem113.INSPECTED_BY) {
            await Section113InspectedBy.setValue([qcItem113.INSPECTED_BY]);
        }

        const Section113Method = Section113.getControl('Section113Method');
        if (Section113Method && qcItem113.METHOD) {
            await Section113Method.setValue(qcItem113.METHOD);
        }

        const Section113DecisionTaken = Section113.getControl('Section113DecisionTaken');
        if (Section113DecisionTaken && qcItem113.DECISION_TAKEN) {
            await Section113DecisionTaken.setValue([qcItem113.DECISION_TAKEN]);
        }

        // Handle image section
        const dynamicImageSection = FormSectionedTable.getSection('Section113DynamicImage');
        const userInputImageSection = FormSectionedTable.getSection('Section113UserInputImage');
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
        } else {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            if (userInputImageSection) {
                await userInputImageSection.setVisible(true);
            }
        }

        // ✅ Decide which Section121 to show based on TYPE
        const type = (binding.TYPE || "").toLowerCase();
        const sectionInlet = FormSectionedTable.getSection('Section121FormInlet');
        const sectionOutlet = FormSectionedTable.getSection('Section121FormOutlet');

        if (type === "inlet") {
            if (sectionInlet) {
                console.log("✅ TYPE=inlet → showing Section121FormInlet");
                await sectionInlet.setVisible(true);
            }
            if (sectionOutlet) {
                await sectionOutlet.setVisible(false);
            }
        } else if (type === "outlet") {
            if (sectionOutlet) {
                console.log("✅ TYPE=outlet → showing Section121FormOutlet");
                await sectionOutlet.setVisible(true);
            }
            if (sectionInlet) {
                await sectionInlet.setVisible(false);
            }
        } else {
            console.warn(`⚠️ Unknown TYPE '${type}' → no Section121 shown`);
        }

    } catch (error) {
        console.error("Error in loadSection113Data:", error);
    }
}
