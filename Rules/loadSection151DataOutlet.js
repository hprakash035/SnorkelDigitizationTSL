export async function loadSection151DataOutlet(
    pageProxy,
    qcItem151,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section151 = FormSectionedTable.getSection('Section151FormOutlet');
        if (!Section151) {
            throw new Error("Section151Form not found in FormSectionedTable.");
        }

        // Always make Section151 visible
        await Section151.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section151.getControl('Section161NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section161 if next flag is false ---
        if (flags?.next === false) {
            const Section161Form = FormSectionedTable.getSection('Section161FormOutlet');
            if (Section161Form) {
                await Section161Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem151?.DATE_INSPECTED) {
            const dateControl = Section151.getControl('Section151Date');
            if (dateControl) {
                await dateControl.setValue(qcItem151.DATE_INSPECTED);
            }
        }

        if (qcItem151?.INSPECTED_BY) {
            const inspectedByControl = Section151.getControl('Section151InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem151.INSPECTED_BY);
            }
        }

        if (qcItem151?.METHOD) {
            const methodControl = Section151.getControl('Section151Method');
            if (methodControl) {
                await methodControl.setValue(qcItem151.METHOD);
            }
        }

        if (qcItem151?.DECISION_TAKEN) {
            const decisionControl = Section151.getControl('Section151DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem151.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section151 data:", error);
    }
}
