export async function loadSection161DataOutlet(
    pageProxy,
    qcItem161,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section161 = FormSectionedTable.getSection('Section161FormOutlet');
        if (!Section161) {
            throw new Error("Section161Form not found in FormSectionedTable.");
        }

        // Always make Section161 visible
        await Section161.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section161.getControl('Section162NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section161 if next flag is false ---
        if (flags?.next === false) {
            const Section161Form = FormSectionedTable.getSection('Section162FormOutlet');
            if (Section161Form) {
                await Section161Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem161?.DATE_INSPECTED) {
            const dateControl = Section161.getControl('Section161Date');
            if (dateControl) {
                await dateControl.setValue(qcItem161.DATE_INSPECTED);
            }
        }

        if (qcItem161?.INSPECTED_BY) {
            const inspectedByControl = Section161.getControl('Section161InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem161.INSPECTED_BY);
            }
        }

        if (qcItem161?.METHOD) {
            const methodControl = Section161.getControl('Section161Method');
            if (methodControl) {
                await methodControl.setValue(qcItem161.METHOD);
            }
        }

        if (qcItem161?.DECISION_TAKEN) {
            const decisionControl = Section161.getControl('Section161DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem161.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section161 data:", error);
    }
}
