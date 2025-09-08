/**
 * Loader for Section121 (Inlet / Outlet based with flags)
 * @param {IClientAPI} pageProxy
 * @param {Object} qcItem121
 * @param {any} FormSectionedTable
 * @param {Array} attachments
 * @param {Object} flags
 * @param {Array} testdataArray
 */
export async function loadSection121Data(pageProxy, qcItem121, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const binding = pageProxy.getBindingObject();
        const type = (binding?.TYPE || "").toLowerCase();

        // Get all related sections
        const sectionInlet = FormSectionedTable.getSection('Section121FormInlet');
        const sectionOutlet = FormSectionedTable.getSection('Section121FormOutlet');
        const section122Inlet = FormSectionedTable.getSection('Section122FormInlet');
        const imageOutlet = FormSectionedTable.getSection('Section121ImageOutlet');
        const userPhotoOutlet = FormSectionedTable.getSection('Section121UserInputImageOutlet');

        if (type === "inlet") {
            console.log("🔑 TYPE=inlet → Showing Section121FormInlet, hiding Section121FormOutlet");
            if (sectionInlet) await sectionInlet.setVisible(true);
            if (sectionOutlet) await sectionOutlet.setVisible(false);

            // Fill Inlet fields
            if (sectionInlet) {
                const dateCtrl = sectionInlet.getControl('Section121DateInlet');
                if (dateCtrl && qcItem121.DATE_INSPECTED) await dateCtrl.setValue(qcItem121.DATE_INSPECTED);

                const inspectedByCtrl = sectionInlet.getControl('Section121InspectedByInlet');
                if (inspectedByCtrl && qcItem121.INSPECTED_BY) await inspectedByCtrl.setValue([qcItem121.INSPECTED_BY]);

                const methodCtrl = sectionInlet.getControl('Section121MethodInlet');
                if (methodCtrl && qcItem121.METHOD) await methodCtrl.setValue(qcItem121.METHOD);

                const decisionCtrl = sectionInlet.getControl('Section121DecisionTakenInlet');
                if (decisionCtrl && qcItem121.DECISION_TAKEN) await decisionCtrl.setValue([qcItem121.DECISION_TAKEN]);

                // ✅ Fill Pipe Numbers dynamically
                for (let i = 1; i <= 12; i++) {
                    const key = `PipeNo${i}`;
                    const ctrl = sectionInlet.getControl(key);
                    if (ctrl && qcItem121[key] !== undefined && qcItem121[key] !== null) {
                        await ctrl.setValue(qcItem121[key]);
                        console.log(`✔️ ${key} set to`, qcItem121[key]);
                    }
                }

                // ✅ Flag-driven visibility for inlet
                const nextButton = sectionInlet.getControl('Section122NextButtonInlet');
                if (nextButton) {
                    await nextButton.setVisible(false);

                    if (flags?.next === false && section122Inlet) {
                        console.log("➡️ flags.next=false → Making Section122FormInlet visible");
                        await section122Inlet.setVisible(true);
                    }
                }
            }
        } 
        else if (type === "outlet") {
            console.log("🔑 TYPE=outlet → Showing Section121FormOutlet, hiding Section121FormInlet");
            if (sectionOutlet) await sectionOutlet.setVisible(true);
            if (sectionInlet) await sectionInlet.setVisible(false);

            // Fill Outlet fields
            if (sectionOutlet) {
                const dateCtrl = sectionOutlet.getControl('Section121DateOutlet');
                if (dateCtrl && qcItem121.DATE_INSPECTED) await dateCtrl.setValue(qcItem121.DATE_INSPECTED);

                const inspectedByCtrl = sectionOutlet.getControl('Section121InspectedByOutlet');
                if (inspectedByCtrl && qcItem121.INSPECTED_BY) await inspectedByCtrl.setValue([qcItem121.INSPECTED_BY]);

                const methodCtrl = sectionOutlet.getControl('Section121MethodOutlet');
                if (methodCtrl && qcItem121.METHOD) await methodCtrl.setValue(qcItem121.METHOD);

                const decisionCtrl = sectionOutlet.getControl('Section121DecisionTakenOutlet');
                if (decisionCtrl && qcItem121.DECISION_TAKEN) await decisionCtrl.setValue([qcItem121.DECISION_TAKEN]);
            }

            // ✅ Flag-driven visibility for outlet
            if (flags?.next === false) {
                if (imageOutlet) {
                    await imageOutlet.setVisible(true);
                    console.log("🖼️ Section121ImageOutlet made visible");
                }
                if (userPhotoOutlet) {
                    await userPhotoOutlet.setVisible(true);
                    console.log("📷 Section121UserInputImageOutlet made visible");
                }
            }
        } 
        else {
            console.warn(`⚠️ Unknown TYPE '${type}'. Neither Inlet nor Outlet section displayed.`);
            if (sectionInlet) await sectionInlet.setVisible(false);
            if (sectionOutlet) await sectionOutlet.setVisible(false);
        }

    } catch (error) {
        console.error("💥 Error in loadSection121Data:", error);
    }
}
