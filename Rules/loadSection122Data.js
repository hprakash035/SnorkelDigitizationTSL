export async function loadSection122Data(pageProxy, qcItem122, FormSectionedTable, attachments, flags, testdataArray) {
  try {
    const Section122 = FormSectionedTable.getSection('Section122FormInlet');
    if (!Section122) {
      throw new Error("Section122FormInlet not found in FormSectionedTable.");
    }

    await Section122.setVisible(true);

    const nextButton = Section122.getControl('Section123NextButton');
    if (nextButton) {
      await nextButton.setVisible(false);

      if (flags?.next === false) {
        const staticImageSection = FormSectionedTable.getSection('Section122StaticImageInlet');
        const userInputImageSection = FormSectionedTable.getSection('Section122UserInputImageInlet');

        await staticImageSection?.setVisible(true);
        await userInputImageSection?.setVisible(true);
      }
    }

    // -------------------------------
    // Populate Form Header Fields
    // -------------------------------
    let hasData = false;

    const dateControl = Section122.getControl('Section122DateInlet');
    if (dateControl && qcItem122.DATE_INSPECTED) {
      await dateControl.setValue(qcItem122.DATE_INSPECTED);
      hasData = true;
    }

    const inspectedByControl = Section122.getControl('Section122InspectedByInlet');
    if (inspectedByControl && qcItem122.INSPECTED_BY) {
      await inspectedByControl.setValue([qcItem122.INSPECTED_BY]);
      hasData = true;
    }

    const methodControl = Section122.getControl('Section122MethodInlet');
    if (methodControl && qcItem122.METHOD) {
      await methodControl.setValue(qcItem122.METHOD);
      hasData = true;
    }

    const decisionControl = Section122.getControl('Section122DecisionTakenInlet');
    if (decisionControl && qcItem122.DECISION_TAKEN) {
      await decisionControl.setValue([qcItem122.DECISION_TAKEN]);
      hasData = true;
    }

    // -------------------------------
    // Image Handling
    // -------------------------------
    const dynamicImageSection = FormSectionedTable.getSection('Section122DynamicImageInlet');
    const userInputImageSection = FormSectionedTable.getSection('Section122UserInputImageInlet');
    const staticImageSection = FormSectionedTable.getSection('Section122StaticImageInlet');

    const binding = pageProxy.getBindingObject();

    let hasDynamicImage = false;
    let hasUserInputImage = false;

    if (hasData) {
      if (staticImageSection) await staticImageSection.setVisible(true);

      if (dynamicImageSection && attachments?.length > 0) {
        const firstAttachment = attachments[0];
        const base64 = firstAttachment?.file;
        const mimeType = firstAttachment?.mimeType || 'image/png';

        if (base64 && base64.length > 100) {
          binding.imageUri = `data:${mimeType};base64,${base64}`;
          await dynamicImageSection.setVisible(true);
          await dynamicImageSection.redraw();
          hasDynamicImage = true;

          if (userInputImageSection) {
            await userInputImageSection.setVisible(false);
          }
        } else {
          binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
          await dynamicImageSection.setVisible(false);
          await dynamicImageSection.redraw();

          if (userInputImageSection) {
            await userInputImageSection.setVisible(true);
            hasUserInputImage = true;
          }
        }
      } else {
        binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
        await dynamicImageSection?.setVisible(false);
        await dynamicImageSection?.redraw();

        if (userInputImageSection) {
          await userInputImageSection.setVisible(true);
          hasUserInputImage = true;
        }
      }
    } else {
      // No header data → hide image sections
      await dynamicImageSection?.setVisible(false);
      await userInputImageSection?.setVisible(false);
      await staticImageSection?.setVisible(false);
    }

  } catch (error) {
    console.error("Error in loadSection122Data:", error);
  }
}
