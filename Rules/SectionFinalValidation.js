


/**
 * Section Final Validation (Combined)
 * Validates all groups & forms in one pass
 * Shows ONE combined error message for all missing fields
 * @param {IClientAPI} clientAPI
 */
export default async function SectionFinalValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const sectionedTable = pageProxy.getControl('FormSectionedTable');
        let errors = [];

        
        const binding = pageProxy.getBindingObject();
        
       


       
        const snorkelNo = clientAPI.binding.SNORKEL_NO;

        // Sections
        const sectionFinal = sectionedTable.getSection('SectionFinalQCMeasurements');
        const castingForm = sectionedTable.getSection('SectionFinalCastingForm');
        const castingRemarkA = sectionedTable.getSection('SectionFinalCastingRemarkStatusFormA');
        const castingRemarkB = sectionedTable.getSection('SectionFinalCastingRemarkStatusFormB');
        const checkForm = sectionedTable.getSection('SectionFinalCheckForm');
        const checkRemarkA = sectionedTable.getSection('SectionFinalCheckRemark');
        const checkRemarkB = sectionedTable.getSection('SectionFinalCheckRemarkBSnorkelLot');

        // ----------------------------
        // 1. QC Measurements Groups A–F
        // ----------------------------
        const groups = ['A', 'B', 'C', 'D', 'E', 'F'];

        for (let g of groups) {
            let measurements = [];
            for (let i = 1; i <= 5; i++) {
                let ctrl = sectionFinal.getControl(`MeasurePoint_${g}${i}`);
                measurements.push(ctrl?.getValue()?.toString().trim());
            }

            let checkCtrl = sectionFinal.getControl(`Check_${g}`);
            let checkVal = checkCtrl?.getValue();

            const hasMeasurement = measurements.some(val => val && val !== '');
            const hasCheck = checkVal && checkVal.length > 0;

            if (!hasMeasurement || !hasCheck) {
                errors.push(`Group ${g} → Fill at least one measurement and select a Check`);
            }
        }

        // ----------------------------
        // 2. Casting Form
        // ----------------------------
        const requiredCastingFields = [
            'Flow_A', 'Flow_B', 'Flow_C', 'Flow_D', 'Flow_E', 'Flow_F',
            'Flow_G', 'Flow_H', 'Flow_I', 'Flow_J', 'Flow_K', 'Flow_L',
            'BrickBrand', 'CastableBrand', 'AddedWater', 'MixingTime',
            'BrickLot', 'CastableLot'
        ];

        for (let field of requiredCastingFields) {
            let ctrl = castingForm.getControl(field);
            let val = ctrl?.getValue()?.toString().trim();
            if (!val || val === '') {
                errors.push(`Casting Form → Please fill in ${field}`);
            }
        }

        // ----------------------------
        // 3. Casting Remark Status Form A
        // ----------------------------
        let remarkValA = castingRemarkA.getControl('SectionFinalCastingRemarkStatusFormARemarks')?.getValue()?.toString().trim();
        let checkValA = castingRemarkA.getControl('SectionFinalCastingRemarkStatusFormACheck')?.getValue();

        if (!remarkValA) errors.push(`Casting Remark A → Remarks required`);
        if (!checkValA || checkValA.length === 0) errors.push(`Casting Remark A → Select at least one Check`);

        // ----------------------------
        // 4. Casting Remark Status Form B
        // ----------------------------
        let remarkValB = castingRemarkB.getControl('SectionFinalCastingRemarkStatusFormBRemark')?.getValue()?.toString().trim();
        let checkValB = castingRemarkB.getControl('SectionFinalCastingRemarkStatusFormBCheck')?.getValue();

        if (!remarkValB) errors.push(`Casting Remark B → Remarks required`);
        if (!checkValB || checkValB.length === 0) errors.push(`Casting Remark B → Select at least one Check`);

        // ----------------------------
        // 5. Check Form
        // ----------------------------
        const requiredCheckFormFields = [
            'CuringTime',
            'DryingTime(hr)',
            'DryingFurnace(MT)',
            'AfterDryingPreAssembly',
            'SnorkelLot',
            'StencilingMarking'
        ];

        for (let field of requiredCheckFormFields) {
            let ctrl = checkForm.getControl(field);
            let val = ctrl?.getValue()?.toString().trim();
            if (!val || val === '') {
                errors.push(`Check Form → Please fill in ${field}`);
            }
        }

        let checkAragon = checkForm.getControl('SectionFinalCheckaragon')?.getValue();
        if (!checkAragon || checkAragon.length === 0) {
            errors.push(`Check Form → Select at least one for Argon Pipe Welding`);
        }

        // ----------------------------
        // 6. Check Remark A
        // ----------------------------
        let remarkValCRA = checkRemarkA.getControl('SectionFinalCheckRemarkASnorkelLotRemark')?.getValue()?.toString().trim();
        let checkValCRA = checkRemarkA.getControl('SectionFinalCheckRemarkACheck')?.getValue();

        if (!remarkValCRA) errors.push(`Check Remark A → Remarks required`);
        if (!checkValCRA || checkValCRA.length === 0) errors.push(`Check Remark A → Select at least one Check`);

        // ----------------------------
        // 7. Check Remark B
        // ----------------------------
        let remarkValCRB = checkRemarkB.getControl('SectionFinalCheckRemarkBRemark')?.getValue()?.toString().trim();
        let checkValCRB = checkRemarkB.getControl('SectionFinalCheckRemarkBcheck')?.getValue();

        if (!remarkValCRB) errors.push(`Check Remark B → Remarks required`);
        if (!checkValCRB || checkValCRB.length === 0) errors.push(`Check Remark B → Select at least one Check`);

        // ----------------------------
        // Final Result
        // ----------------------------
        if (errors.length > 0) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: {
                    Message: errors.join('\n• ')
                }
            });
        }

        // ✅ If all validations pass → Build Payload
        const payloads = await buildSectionFinalPayload(clientAPI);

        // Save measurements
        for (let m of payloads.measurements) {
            await clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/QCMeasurementsCreate.action',
                Properties: { Data: m }
            });
        }

        // Save casting
        for (let c of payloads.castings) {
            await clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/QCCastingCreate.action',
                Properties: { Data: c }
            });
        }

        // Save check
        for (let chk of payloads.checks) {
            await clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/QCCheckCreate.action',
                Properties: { Data: chk }
            });
        }

        return clientAPI.executeAction('/TRL_Snorkel_Digitization_TSL/Actions/SuccessMessage.action');

    } catch (error) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section Final validation. Please try again.'
            }
        });
    }
}


async function buildSectionFinalPayload(clientAPI) {
    const pageProxy = clientAPI.getPageProxy();
    const sectionedTable = pageProxy.getControl('FormSectionedTable');
    const binding = pageProxy.getBindingObject(); // has QC_HEADER
    const snorkelNo = clientAPI.binding.SNORKEL_NO;
    const type =clientAPI.binding.TYPE;
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
            qC_HEADER_ID: snorkelNo,   // cuid link
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
