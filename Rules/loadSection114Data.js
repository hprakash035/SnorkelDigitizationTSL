export async function loadSection114Data(pageProxy, qcItem114, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section114 = FormSectionedTable.getSection('Section114Form');
        if (!Section114) {
            throw new Error("Section114Form not found in FormSectionedTable.");
        }

        await Section114.setVisible(true);

        // ---------------------------
        // Hide Next Button
        // ---------------------------
        const nextButton = Section114.getControl('Section114NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            // if (flags?.next === false) {
            //     const Section114StaticImage = FormSectionedTable.getSection('Section114StaticImage');
            //     if (Section114StaticImage) {
            //         await Section114StaticImage.setVisible(true);
            //     }
            //     const Section114UserInputImage = FormSectionedTable.getSection('Section114UserInputImage');
            //     if (Section114UserInputImage) {
            //         await Section114UserInputImage.setVisible(true);
            //     }
            // }
        }

        // ---------------------------
        // Populate form data
        // ---------------------------
        let hasData = false;

        const Section114Date = Section114.getControl('Section114Date');
        if (Section114Date && qcItem114.DATE_INSPECTED) {
            await Section114Date.setValue(qcItem114.DATE_INSPECTED);
            hasData = true;
        }

        const Section114InspectedBy = Section114.getControl('Section114InspectedBy');
        if (Section114InspectedBy && qcItem114.INSPECTED_BY) {
            await Section114InspectedBy.setValue([qcItem114.INSPECTED_BY]);
            hasData = true;
        }

        const Section114Method = Section114.getControl('Section114Method');
        if (Section114Method && qcItem114.METHOD) {
            await Section114Method.setValue(qcItem114.METHOD);
            hasData = true;
        }

        const Section114DecisionTaken = Section114.getControl('Section114DecisionTaken');
        if (Section114DecisionTaken && qcItem114.DECISION_TAKEN) {
            await Section114DecisionTaken.setValue([qcItem114.DECISION_TAKEN]);
            hasData = true;
        }

        // ---------------------------
        // Handle image sections only if form has data
        // ---------------------------
        const dynamicImageSection = FormSectionedTable.getSection('Section114DynamicImage');
        const userInputImageSection = FormSectionedTable.getSection('Section114UserInputImage');
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

        // ---------------------------
        // TYPE check for Section121
        // ---------------------------
        const type = (binding.TYPE || "").toLowerCase();
        const sectionInlet = FormSectionedTable.getSection('Section121FormInlet');
        const sectionOutlet = FormSectionedTable.getSection('Section121FormOutlet');

        if (type === "inlet") {
            if (sectionInlet) {
                if (hasDynamicImage) {
                    // console.log("✅ TYPE=inlet & dynamic image present → showing Section121FormInlet");
                    await sectionInlet.setVisible(true);
                } else {
                    // console.log("🚫 TYPE=inlet but no dynamic image → hiding Section121FormInlet");
                    await sectionInlet.setVisible(false);
                }
            }
            if (sectionOutlet) {
                await sectionOutlet.setVisible(false);
            }
        } else if (type === "outlet") {
            if (sectionOutlet) {
                if (hasDynamicImage) {
                    // console.log("✅ TYPE=outlet & user input image present → showing Section121FormOutlet");
                    await sectionOutlet.setVisible(true);
                } else {
                    // console.log("🚫 TYPE=outlet but no user input image → hiding Section121FormOutlet");
                    await sectionOutlet.setVisible(false);
                }
            }
            if (sectionInlet) {
                await sectionInlet.setVisible(false);
            }
        } else {
            // console.warn(`⚠️ Unknown TYPE '${type}' → hiding both Section121 forms`);
            if (sectionInlet) await sectionInlet.setVisible(false);
            if (sectionOutlet) await sectionOutlet.setVisible(false);
        }

    } catch (error) {
        // console.error("Error in loadSection114Data:", error);
    }
}
