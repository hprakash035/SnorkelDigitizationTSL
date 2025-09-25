export async function loadSection205Data(pageProxy, qcItem205, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section205 = FormSectionedTable.getSection('Section205Form');
        if (!Section205) {
            throw new Error("Section205Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section205.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section205.getControl('Section206NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section206Form = FormSectionedTable.getSection('Section206Form');
                if (Section206Form) {
                    await Section206Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem205?.DATE_INSPECTED) {
            const dateControl = Section205.getControl('Section205Date');
            if (dateControl) {
                await dateControl.setValue(qcItem205.DATE_INSPECTED);
            }
        }

        if (qcItem205?.INSPECTED_BY) {
            const inspectedByControl = Section205.getControl('Section205InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem205.INSPECTED_BY]);
            }
        }

        if (qcItem205?.METHOD) {
            const methodControl = Section205.getControl('Section205Method');
            if (methodControl) {
                await methodControl.setValue(qcItem205.METHOD);
            }
        }

        if (qcItem205?.DECISION_TAKEN) {
            const decisionControl = Section205.getControl('Section205DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem205.DECISION_TAKEN]);
            }
        }

    } catch (error) {
        console.error("Error loading Section205 data:", error);
    }
}
