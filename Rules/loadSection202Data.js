export async function loadSection202Data(pageProxy, qcItem202, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section202 = FormSectionedTable.getSection('Section202Form');
        if (!Section202) {
            throw new Error("Section202Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section202.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section202.getControl('Section203NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section203Form = FormSectionedTable.getSection('Section203Form');
                if (Section203Form) {
                    await Section203Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem202?.DATE_INSPECTED) {
            const dateControl = Section202.getControl('Section202Date');
            if (dateControl) {
                await dateControl.setValue(qcItem202.DATE_INSPECTED);
            }
        }

        if (qcItem202?.INSPECTED_BY) {
            const inspectedByControl = Section202.getControl('Section202InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem202.INSPECTED_BY]);
            }
        }

        if (qcItem202?.METHOD) {
            const methodControl = Section202.getControl('Section202Method');
            if (methodControl) {
                await methodControl.setValue(qcItem202.METHOD);
            }
        }

        if (qcItem202?.DECISION_TAKEN) {
            const decisionControl = Section202.getControl('Section202DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem202.DECISION_TAKEN]);
            }
        }

    } catch (error) {
        console.error("Error loading Section202 data:", error);
    }
}
