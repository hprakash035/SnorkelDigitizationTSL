export async function loadSection206Data(pageProxy, qcItem206, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section206 = FormSectionedTable.getSection('Section206Form');
        if (!Section206) {
            throw new Error("Section206Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section206.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section206.getControl('Section211NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section211Form = FormSectionedTable.getSection('Section211Form');
                if (Section211Form) {
                    await Section211Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem206?.DATE_INSPECTED) {
            const dateControl = Section206.getControl('Section206Date');
            if (dateControl) {
                await dateControl.setValue(qcItem206.DATE_INSPECTED);
            }
        }

        if (qcItem206?.INSPECTED_BY) {
            const inspectedByControl = Section206.getControl('Section206InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem206.INSPECTED_BY]);
            }
        }

        if (qcItem206?.METHOD) {
            const methodControl = Section206.getControl('Section206Method');
            if (methodControl) {
                await methodControl.setValue(qcItem206.METHOD);
            }
        }

        if (qcItem206?.DECISION_TAKEN) {
            const decisionControl = Section206.getControl('Section206DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem206.DECISION_TAKEN]);
            }
        }

    } catch (error) {
        console.error("Error loading Section206 data:", error);
    }
}
