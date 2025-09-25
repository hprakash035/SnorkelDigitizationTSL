export async function loadSection173DataOutlet(
    pageProxy,
    qcItem173,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section173 = FormSectionedTable.getSection('Section173FormOutlet');
        if (!Section173) {
            throw new Error("Section173Form not found in FormSectionedTable.");
        }

        // Always make Section173 visible
        await Section173.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section173.getControl('Section174NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section173 if next flag is false ---
        if (flags?.next === false) {
            const Section173Form = FormSectionedTable.getSection('Section174FormOutlet');
            if (Section173Form) {
                await Section173Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem173?.DATE_INSPECTED) {
            const dateControl = Section173.getControl('Section173Date');
            if (dateControl) {
                await dateControl.setValue(qcItem173.DATE_INSPECTED);
            }
        }

        if (qcItem173?.INSPECTED_BY) {
            const inspectedByControl = Section173.getControl('Section173InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem173.INSPECTED_BY);
            }
        }

        if (qcItem173?.METHOD) {
            const methodControl = Section173.getControl('Section173Method');
            if (methodControl) {
                await methodControl.setValue(qcItem173.METHOD);
            }
        }

        if (qcItem173?.DECISION_TAKEN) {
            const decisionControl = Section173.getControl('Section173DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem173.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section173 data:", error);
    }
}
