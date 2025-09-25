async function buildSectionFinalPayload(clientAPI) {
    const pageProxy = clientAPI.getPageProxy();
    const sectionedTable = pageProxy.getControl('FormSectionedTable');
    const binding = pageProxy.getBindingObject(); // has QC_HEADER
    const snorkelNo = binding.SNORKEL_NO;
    const type = binding.TYPE;

    let payloads = {
        measurements: [],
        castings: [],
        checks: []
    };

    // ============ Measurements ============
    const sectionFinal = sectionedTable.getSection('SectionFinalQCMeasurements');
    const groups = ['A','B','C','D','E','F'];
    for (let g of groups) {
        let mpValues = [];
        for (let i=1; i<=5; i++) {
            mpValues.push(sectionFinal.getControl(`MeasurePoint_${g}${i}`)?.getValue() || '');
        }
        let checkVal = sectionFinal.getControl(`Check_${g}`)?.getValue() || [];
        payloads.measurements.push({
            qC_HEADER_ID: snorkelNo,
            measurementItem: `Group ${g}`,
            sign: g,
            mp1: mpValues[0],
            mp2: mpValues[1],
            mp3: mpValues[2],
            mp4: mpValues[3],
            mp5: mpValues[4],
            checkStatus: checkVal.join(','),
            remarks: ''
        });
    }

    // ============ Casting ============
    const castingForm = sectionedTable.getSection('SectionFinalCastingForm');
    const castingRemarkA = sectionedTable.getSection('SectionFinalCastingRemarkStatusFormA');
    const castingRemarkB = sectionedTable.getSection('SectionFinalCastingRemarkStatusFormB');

    payloads.castings.push({
        qC_HEADER_ID: snorkelNo,
        brickBrandName: castingForm.getControl('BrickBrand')?.getValue(),
        brickLotNo: castingForm.getControl('BrickLot')?.getValue(),
        castableBrandName: castingForm.getControl('CastableBrand')?.getValue(),
        castableLotNo: castingForm.getControl('CastableLot')?.getValue(),
        addedWaterPercent: castingForm.getControl('AddedWater')?.getValue(),
        mixingTimeMin: castingForm.getControl('MixingTime')?.getValue(),
        argonPipeFlowA: castingForm.getControl('Flow_A')?.getValue(),
        argonPipeFlowB: castingForm.getControl('Flow_B')?.getValue(),
        argonPipeFlowC: castingForm.getControl('Flow_C')?.getValue(),
        argonPipeFlowD: castingForm.getControl('Flow_D')?.getValue(),
        argonPipeFlowE: castingForm.getControl('Flow_E')?.getValue(),
        argonPipeFlowF: castingForm.getControl('Flow_F')?.getValue(),
        argonPipeFlowG: castingForm.getControl('Flow_G')?.getValue(),
        argonPipeFlowH: castingForm.getControl('Flow_H')?.getValue(),
        argonPipeFlowI: castingForm.getControl('Flow_I')?.getValue(),
        argonPipeFlowJ: castingForm.getControl('Flow_J')?.getValue(),
        argonPipeFlowK: castingForm.getControl('Flow_K')?.getValue(),
        argonPipeFlowL: castingForm.getControl('Flow_L')?.getValue(),
        remarks: [
            castingRemarkA.getControl('SectionFinalCastingRemarkStatusFormARemarks')?.getValue(),
            castingRemarkB.getControl('SectionFinalCastingRemarkStatusFormBRemark')?.getValue()
        ].filter(Boolean).join(' | '),
        checkStatus: [
            ...(castingRemarkA.getControl('SectionFinalCastingRemarkStatusFormACheck')?.getValue() || []),
            ...(castingRemarkB.getControl('SectionFinalCastingRemarkStatusFormBCheck')?.getValue() || [])
        ].join(','),
        type: type
    });

    // ============ Check ============
    const checkForm = sectionedTable.getSection('SectionFinalCheckForm');
    const checkRemarkA = sectionedTable.getSection('SectionFinalCheckRemark');
    const checkRemarkB = sectionedTable.getSection('SectionFinalCheckRemarkBSnorkelLot');

    payloads.checks.push({
        qC_HEADER_ID: snorkelNo,
        curingTimeHr: checkForm.getControl('CuringTime')?.getValue(),
        dryingTimeHr: checkForm.getControl('DryingTime(hr)')?.getValue(),
        dryingFurnace: checkForm.getControl('DryingFurnace(MT)')?.getValue(),
        afterDrying: checkForm.getControl('AfterDryingPreAssembly')?.getValue(),
        argonPipeWelding: (checkForm.getControl('SectionFinalCheckaragon')?.getValue() || []).join(','),
        snorkelLotNo: checkForm.getControl('SnorkelLot')?.getValue(),
        stencilingMarking: checkForm.getControl('StencilingMarking')?.getValue(),
        remarks: [
            checkRemarkA.getControl('SectionFinalCheckRemarkASnorkelLotRemark')?.getValue(),
            checkRemarkB.getControl('SectionFinalCheckRemarkBRemark')?.getValue()
        ].filter(Boolean).join(' | '),
        checkStatus: [
            ...(checkRemarkA.getControl('SectionFinalCheckRemarkACheck')?.getValue() || []),
            ...(checkRemarkB.getControl('SectionFinalCheckRemarkBcheck')?.getValue() || [])
        ].join(','),
        type: type
    });

    return payloads;
}
