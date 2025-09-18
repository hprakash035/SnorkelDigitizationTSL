export async function loadSection163DataOutlet(
    pageProxy,
    qcItem163,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section163 = FormSectionedTable.getSection('Section163FormOutlet');
        if (!Section163) {
            throw new Error("Section163Form not found in FormSectionedTable.");
        }

        // Always make Section163 visible
        await Section163.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section163.getControl('Section171NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section163 if next flag is false ---
        if (flags?.next === false) {
            const Section163Form = FormSectionedTable.getSection('Section171FormOutlet');
            if (Section163Form) {
                await Section163Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem163?.DATE_INSPECTED) {
            const dateControl = Section163.getControl('Section163Date');
            if (dateControl) {
                await dateControl.setValue(qcItem163.DATE_INSPECTED);
            }
        }

        if (qcItem163?.INSPECTED_BY) {
            const inspectedByControl = Section163.getControl('Section163InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem163.INSPECTED_BY);
            }
        }

        if (qcItem163?.METHOD) {
            const methodControl = Section163.getControl('Section163Method');
            if (methodControl) {
                await methodControl.setValue(qcItem163.METHOD);
            }
        }

        if (qcItem163?.DECISION_TAKEN) {
            const decisionControl = Section163.getControl('Section163DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem163.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section163 data:", error);
    }
}
