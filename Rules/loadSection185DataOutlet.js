export async function loadSection185DataOutlet(
    pageProxy,
    qcItem185,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section185 = FormSectionedTable.getSection('Section185FormOutlet');
        if (!Section185) {
            throw new Error("Section185Form not found in FormSectionedTable.");
        }

        // Always make Section185 visible
        await Section185.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section185.getControl('Section191NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section185 if next flag is false ---
        if (flags?.next === false) {
            const Section185Form = FormSectionedTable.getSection('Section191FormOutlet');
            if (Section185Form) {
                await Section185Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem185?.DATE_INSPECTED) {
            const dateControl = Section185.getControl('Section185Date');
            if (dateControl) {
                await dateControl.setValue(qcItem185.DATE_INSPECTED);
            }
        }

        if (qcItem185?.INSPECTED_BY) {
            const inspectedByControl = Section185.getControl('Section185InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem185.INSPECTED_BY);
            }
        }

        if (qcItem185?.METHOD) {
            const methodControl = Section185.getControl('Section185Method');
            if (methodControl) {
                await methodControl.setValue(qcItem185.METHOD);
            }
        }

        if (qcItem185?.DECISION_TAKEN) {
            const decisionControl = Section185.getControl('Section185DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem185.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section185 data:", error);
    }
}
