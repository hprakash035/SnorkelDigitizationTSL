export async function loadSection191DataOutlet(pageProxy, qcItem191, FormSectionedTable, attachments = [], flags, testdataArray = []) {
    try {
        const Section191 = FormSectionedTable.getSection('Section191FormOutlet');
        if (!Section191) throw new Error("❌ Section191FormOutlet not found in FormSectionedTable.");

        await Section191.setVisible(true);

        // -------------------------------
        // Helpers
        // -------------------------------
        const hideNextButton = async (section, buttonName) => {
            if (section) {
                const btn = section.getControl(buttonName);
                if (btn) {
                    await btn.setVisible(false);
                    // console.log(`🚫 Hidden ${buttonName}`);
                }
            }
        };

        const setValueIfPresent = async (controlName, value) => {
            const control = Section191.getControl(controlName);
            if (control && value !== undefined && value !== null) {
                await control.setValue(value);
            }
        };

        // -------------------------------
        // Metadata
        // -------------------------------
        await setValueIfPresent('Section191DateOutlet', qcItem191.DATE_INSPECTED);
        await setValueIfPresent('Section191InspectedByOutlet', qcItem191.INSPECTED_BY ? [qcItem191.INSPECTED_BY] : undefined);
        await setValueIfPresent('Section191MethodOutlet', qcItem191.METHOD);
        await setValueIfPresent('Section191DecisionTakenOutlet', qcItem191.DECISION_TAKEN ? [qcItem191.DECISION_TAKEN] : undefined);

        // Hide static NEXT after metadata if data exists
        if (qcItem191?.DATE_INSPECTED || qcItem191?.INSPECTED_BY || qcItem191?.METHOD || qcItem191?.DECISION_TAKEN) {
            await hideNextButton(Section191, "Section191StaticNextButton");
        }

        // -------------------------------
        // Image handling
        // -------------------------------
        FormSectionedTable.getSection('Section191StaticImage')?.setVisible(true);
        const dynamicImageSection = FormSectionedTable.getSection('Section191DynamicImage');
        const userInputImageSection = FormSectionedTable.getSection('Section191UserInputForm');
        const binding = pageProxy.getBindingObject();

        let hasDynamicImage = false;

        if (dynamicImageSection && attachments.length > 0) {
            const firstAttachment = attachments[0];
            const base64 = firstAttachment?.file;
            const mimeType = firstAttachment?.mimeType || 'image/png';

            if (base64 && base64.length > 100) {
                binding.imageUri = `data:${mimeType};base64,${base64}`;
                await dynamicImageSection.setVisible(true);
                await dynamicImageSection.redraw();

                hasDynamicImage = true;

                if (userInputImageSection) {
                    await userInputImageSection.setVisible(false);
                }
            }
        }

        if (!hasDynamicImage) {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            if (userInputImageSection) {
                await userInputImageSection.setVisible(true);
            }
        }

        // -------------------------------
        // Show next form automatically if data exists
        // -------------------------------
        const Section192 = FormSectionedTable.getSection('Section192FormOutlet');

        if (qcItem191?.DATE_INSPECTED || hasDynamicImage) {
            // ✅ Auto-show Section192
            await Section192?.setVisible(true);

            // Hide its Next button too if data is present
            await hideNextButton(Section192, "Section192StaticNextButtonOutlet");
        } else {
            // ❌ Keep Section192 hidden until button pressed
            await Section192?.setVisible(false);
        }

    } catch (error) {
        console.error("❌ Error in loadSection191DataOutlet:", error);
    }
}
