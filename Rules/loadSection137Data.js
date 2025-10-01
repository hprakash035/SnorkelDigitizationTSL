export async function loadSection137Data(pageProxy, qcItem137, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section137 = FormSectionedTable.getSection('Section137Form');
        if (!Section137) {
            throw new Error("Section137Form not found in FormSectionedTable.");
        }

        await Section137.setVisible(true);

        // ---------------------------
        // Hide Next Button
        // ---------------------------
        const nextButton = Section137.getControl('Section137NextButtonInlet');
        if (nextButton) {
            await nextButton.setVisible(false);

            // if (flags?.next === false) {
            //     const Section137StaticImage = FormSectionedTable.getSection('Section137StaticImage');
            //     if (Section137StaticImage) {
            //         await Section137StaticImage.setVisible(true);
            //     }
            //     const Section137UserInputImage = FormSectionedTable.getSection('Section137UserInputImage');
            //     if (Section137UserInputImage) {
            //         await Section137UserInputImage.setVisible(true);
            //     }
            // }
        }

        // ---------------------------
        // Populate form data
        // ---------------------------
        let hasData = false;

        const Section137Date = Section137.getControl('Section137DateInlet');
        if (Section137Date && qcItem137.DATE_INSPECTED) {
            await Section137Date.setValue(qcItem137.DATE_INSPECTED);
            hasData = true;
        }

        const Section137InspectedBy = Section137.getControl('Section137InspectedByInlet');
        if (Section137InspectedBy && qcItem137.INSPECTED_BY) {
            await Section137InspectedBy.setValue([qcItem137.INSPECTED_BY]);
            hasData = true;
        }

        const Section137Method = Section137.getControl('Section137MethodInlet');
        if (Section137Method && qcItem137.METHOD) {
            await Section137Method.setValue(qcItem137.METHOD);
            hasData = true;
        }

        const Section137DecisionTaken = Section137.getControl('Section137DecisionTakenInlet');
        if (Section137DecisionTaken && qcItem137.DECISION_TAKEN) {
            await Section137DecisionTaken.setValue([qcItem137.DECISION_TAKEN]);
            hasData = true;
        }

      for (let i = 1; i <= 12; i++) {
                    const key = `PipeNo${i}`;
                    const ctrl = sectionInlet.getControl(key);
                    if (ctrl && qcItem121[key] !== undefined && qcItem121[key] !== null) {
                        await ctrl.setValue(qcItem121[key]);
                        // console.log(`✔️ ${key} set to`, qcItem121[key]);
                    }
                }
  

    } catch (error) {
        // console.error("Error in loadSection137Data:", error);
    }
}
