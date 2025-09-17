export async function loadSection121DataOutlet(pageProxy, qcItem121, FormSectionedTable, attachments = [], flags, testdataArray = []) {
    try {
        const Section121 = FormSectionedTable.getSection('Section121FormOutlet');
        if (!Section121) throw new Error("❌ Section121FormOutlet not found in FormSectionedTable.");

        await Section121.setVisible(true);

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
            const control = Section121.getControl(controlName);
            if (control && value !== undefined && value !== null) {
                await control.setValue(value);
            }
        };

        // -------------------------------
        // Metadata
        // -------------------------------
        await setValueIfPresent('Section121DateOutlet', qcItem121.DATE_INSPECTED);
        await setValueIfPresent('Section121InspectedByOutlet', qcItem121.INSPECTED_BY ? [qcItem121.INSPECTED_BY] : undefined);
        await setValueIfPresent('Section121MethodOutlet', qcItem121.METHOD);
        await setValueIfPresent('Section121DecisionTakenOutlet', qcItem121.DECISION_TAKEN ? [qcItem121.DECISION_TAKEN] : undefined);

        // Hide static NEXT after metadata if data exists
        if (qcItem121?.DATE_INSPECTED || qcItem121?.INSPECTED_BY || qcItem121?.METHOD || qcItem121?.DECISION_TAKEN) {
            await hideNextButton(Section121, "Section122NextButtonOutlet");
        }

        // -------------------------------
        // Image handling
        // -------------------------------
        FormSectionedTable.getSection('Section121ImageOutlet')?.setVisible(true);
        const dynamicImageSection = FormSectionedTable.getSection('Section121DynamicImageOutlet');
        const userInputImageSection = FormSectionedTable.getSection('Section121UserInputImageOutlet');
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
        const Section122 = FormSectionedTable.getSection('Section122FormOutlet');

        if (qcItem121?.DATE_INSPECTED || hasDynamicImage) {
            // ✅ Auto-show Section122
            await Section122?.setVisible(true);

            // Hide its Next button too if data is present
            await hideNextButton(Section122, "Section122StaticNextButtonOutlet");
        } else {
            // ❌ Keep Section122 hidden until button pressed
            await Section122?.setVisible(false);
        }

    } catch (error) {
        console.error("❌ Error in loadSection121DataOutlet:", error);
    }
}
