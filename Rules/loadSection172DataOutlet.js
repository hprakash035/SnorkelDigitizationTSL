export async function loadSection172DataOutlet(
    pageProxy,
    qcItem172,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section172 = FormSectionedTable.getSection('Section172FormOutlet');
        if (!Section172) {
            throw new Error("Section172Form not found in FormSectionedTable.");
        }

        // Always make Section172 visible
        await Section172.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section172.getControl('Section173NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section172 if next flag is false ---
        if (flags?.next === false) {
            const Section172Form = FormSectionedTable.getSection('Section173FormOutlet');
            if (Section172Form) {
                await Section172Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem172?.DATE_INSPECTED) {
            const dateControl = Section172.getControl('Section172Date');
            if (dateControl) {
                await dateControl.setValue(qcItem172.DATE_INSPECTED);
            }
        }

        if (qcItem172?.INSPECTED_BY) {
            const inspectedByControl = Section172.getControl('Section172InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem172.INSPECTED_BY);
            }
        }

        if (qcItem172?.METHOD) {
            const methodControl = Section172.getControl('Section172Method');
            if (methodControl) {
                await methodControl.setValue(qcItem172.METHOD);
            }
        }

        if (qcItem172?.DECISION_TAKEN) {
            const decisionControl = Section172.getControl('Section172DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem172.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section172 data:", error);
    }
}
