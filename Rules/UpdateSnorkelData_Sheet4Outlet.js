// File: UpdateSnorkelData_Sheet4Outlet.js
import LoadSnorkelData4 from './LoadSnorkelData4';

export default async function UpdateSnorkelData_Sheet4Outlet(clientAPI) {
    clientAPI.showActivityIndicator("...");
    const snorkelNo = clientAPI.binding.SNORKEL_NO;
    const service = '/TRL_Snorkel_Digitization_TSL/Services/TRL_Snorkel_CAP_SRV.service';

    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        // --- Read QC_HEADER ---
        const headerResults = await clientAPI.read(service, 'QC_HEADER', [], `$filter=SNORKEL_NO eq '${snorkelNo}'`);
        if (!headerResults || !Array.isArray(headerResults._array) || headerResults._array.length !== 1) {
            throw new Error(`❌ QC_HEADER not found or multiple found`);
        }

        const header = headerResults._array[0];
        const headerReadLink = header['@odata.readLink'];

        // --- Read related QC_ITEMS ---
        const itemsResult = await clientAPI.read(service, `${headerReadLink}/qc_ITEMS`, [], '');
        const items = itemsResult?._array || [];

        for (const item of items) {
            const question = item.QUESTION || '';
            const sectionKey = question.match(/^(\d+\.\d+)/)?.[1];
            if (!sectionKey) continue;

            const sectionId = getSectionFormId(sectionKey);
            const section = FormSectionedTable.getSection(sectionId);
            if (!section || !section.getVisible()) continue;

            const values = await getUpdatedValuesForSection(sectionKey, section);
            if (Object.keys(values).length === 0) continue;

            const itemReadLink = item['@odata.readLink'] || `QC_ITEM(${item.ID})`;

            try {
                await clientAPI.executeAction({
                    Name: '/TRL_Snorkel_Digitization_TSL/Actions/UpdateEntity.action',
                    Properties: {
                        Target: { EntitySet: 'QC_ITEM', Service: service, ReadLink: itemReadLink },
                        Properties: values
                    }
                });
            } catch (err) {}
        }

        await LoadSnorkelData4(clientAPI);
        clientAPI.dismissActivityIndicator();

    } catch (error) {
        clientAPI.dismissActivityIndicator();
    }
}

/**
 * Map section keys to FormSection IDs (OUTLET)
 */
function getSectionFormId(key) {
    return {
        '13.1': 'Section131FormOutlet',
        '14.1': 'Section141FormOutlet',
        '14.2': 'Section142FormOutlet',
        '15.1': 'Section151FormOutlet',
        '16.1': 'Section161FormOutlet',
        '16.2': 'Section162FormOutlet',
        '16.3': 'Section163FormOutlet',
    }[key];
}

/**
 * Extract values from controls for each Outlet section
 */
async function getUpdatedValuesForSection(key, section) {
    const updated = {};
    const getDate = async (ctrl) => {
        const val = await section.getControl(ctrl).getValue();
        return val ? new Date(val).toISOString() : undefined;
    };

    if (key === '13.1') {
        updated.DATE_INSPECTED = await getDate('Section131DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section131InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section131MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section131DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '14.1') {
        updated.DATE_INSPECTED = await getDate('Section141DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section141InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section141MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section141DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '14.2') {
        updated.DATE_INSPECTED = await getDate('Section142DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section142InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section142MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section142DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '15.1') {
        updated.DATE_INSPECTED = await getDate('Section151DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section151InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section151MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section151DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '16.1') {
        updated.DATE_INSPECTED = await getDate('Section161DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section161InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section161MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section161DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '16.2') {
        updated.DATE_INSPECTED = await getDate('Section162DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section162InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section162MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section162DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    if (key === '16.3') {
        updated.DATE_INSPECTED = await getDate('Section163DateOutlet');
        updated.INSPECTED_BY = (await section.getControl('Section163InspectedByOutlet').getValue())?.[0]?.ReturnValue || '';
        updated.METHOD = await section.getControl('Section163MethodOutlet').getValue();
        updated.DECISION_TAKEN = (await section.getControl('Section163DecisionTakenOutlet').getValue())?.[0]?.ReturnValue || '';
    }

    Object.keys(updated).forEach(k => updated[k] === undefined && delete updated[k]);
    return updated;
}
