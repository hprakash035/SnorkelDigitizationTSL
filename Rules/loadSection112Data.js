export async function loadSection112Data(pageProxy, qcItem112, FormSectionedTable, attachments = [], flags, testdataArray = []) {
  try {
    // console.log("🚀 Entering loadSection112Data...");

    // -------------------------------
    // Section lookup
    // -------------------------------
    const Section112 = FormSectionedTable.getSection('Section112Form');
    if (!Section112) throw new Error("❌ Section112Form not found in FormSectionedTable.");

    await Section112.setVisible(true);
    // console.log("📌 Section112Form made visible");

    // -------------------------------
    // Hide NEXT button immediately
    // -------------------------------
    const nextButton = Section112.getControl('Section112StaticNextButton');
    if (nextButton) {
      await nextButton.setVisible(false);
      // console.log("🚫 Hidden Section112StaticNextButton");
    }

    // -------------------------------
    // Metadata population
    // -------------------------------
    let hasMetadata = false;

    const setValueIfPresent = async (controlName, value) => {
      const control = Section112.getControl(controlName);
      if (control && value !== undefined && value !== null) {
        await control.setValue(value);
        // console.log(`✅ Populated ${controlName} with`, value);
        hasMetadata = true;
      } else {
        // console.log(`ℹ️ Skipped ${controlName} (no value or control not found)`);
      }
    };

    await setValueIfPresent('Section112Date', qcItem112.DATE_INSPECTED);
    await setValueIfPresent('Section112InspectedBy', qcItem112.INSPECTED_BY ? [qcItem112.INSPECTED_BY] : undefined);
    await setValueIfPresent('Section112Method', qcItem112.METHOD);
    await setValueIfPresent('Section112DecisionTaken', qcItem112.DECISION_TAKEN ? [qcItem112.DECISION_TAKEN] : undefined);

    // console.log(`📌 Metadata populated: ${hasMetadata}`);

    // -------------------------------
    // Image handling (only if metadata exists)
    // -------------------------------
    const dynamicImageSection = FormSectionedTable.getSection('Section112DynamicImage');
    const staticImageSection = FormSectionedTable.getSection('Section112StaticImage');
    const userInputImageSection = FormSectionedTable.getSection('Section112UserInputImage');
    const binding = pageProxy.getBindingObject();

    let hasDynamicImage = false;

    if (hasMetadata) {
      if (dynamicImageSection && attachments.length > 0) {
        // console.log(`📂 Found ${attachments.length} attachments`);
        const firstAttachment = attachments[0];
        const base64 = firstAttachment?.file;
        const mimeType = firstAttachment?.mimeType || 'image/png';

        if (base64 && base64.length > 100) {
          binding.imageUri = `data:${mimeType};base64,${base64}`;
          await dynamicImageSection.setVisible(true);
          await dynamicImageSection.redraw();
          // console.log("✅ Dynamic image loaded into Section112DynamicImage");

          hasDynamicImage = true;

          await staticImageSection?.setVisible(true);
          await userInputImageSection?.setVisible(false);
        }
      }

      if (!hasDynamicImage) {
        binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
        await dynamicImageSection?.setVisible(false);
        await dynamicImageSection?.redraw();
        // console.log("ℹ️ No valid dynamic image → fallback applied");

        await staticImageSection?.setVisible(true);
        await userInputImageSection?.setVisible(true);
      }
    } else {
      // Hide all image sections if no metadata
      await dynamicImageSection?.setVisible(false);
      await staticImageSection?.setVisible(false);
      await userInputImageSection?.setVisible(false);
      // console.log("🚫 Metadata not available → All image sections hidden");
    }

    // -------------------------------
    // Section 113 visibility (✅ only if dynamic image exists)
    // -------------------------------
    const Section113Form = FormSectionedTable.getSection('Section113Form');
    if (Section113Form) {
      await Section113Form.setVisible(hasDynamicImage);
      // console.log(`📌 Section113Form visibility = ${hasDynamicImage}`);
    }

    // console.log("✅ loadSection112Data completed successfully");
  } catch (error) {
    // console.error("❌ Error in loadSection112Data:", error);
  }
}
