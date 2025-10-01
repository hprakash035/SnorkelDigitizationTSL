import { loadInletSectionLoader } from './loadInletSectionLoader3';
import { loadOutletSectionLoader } from './loadOutletSectionLoader3';

export default async function LoadSnorkelDataPage3(clientAPI) {
    try {
        clientAPI.showActivityIndicator("Loading data...");

        const pageProxy = clientAPI.getPageProxy();
        const binding = pageProxy.getBindingObject();
        const readLink = binding['@odata.readLink'];
        const service = '/TRL_Snorkel_Digitization_TSL/Services/TRL_Snorkel_CAP_SRV.service';
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        // --- Read Data ---
        const [itemsResult, headerFiles, attachmentsResult, testdata] = await Promise.all([
            clientAPI.read(service, `${readLink}/qc_ITEMS`, [], ''),
            clientAPI.read(service, `${readLink}/headerFiles`, [], ''),
            clientAPI.read(service, `${readLink}/qc_ATTACHMENTS`, [], ''),
            clientAPI.read(service, `${readLink}/qc_TESTS`, [], ''),
        ]);

        const items = itemsResult._array;
        const attachments = attachmentsResult._array;
        const attachmentGroups = groupAttachmentsByQuestion(attachments);
        const flags = { next: false };

        // --- Handle TYPE condition ---
        const type = binding.TYPE?.toLowerCase();
        console.log("📌 Page4 Snorkel TYPE:", type);

        if (type === "inlet") {
            FormSectionedTable.getSection('Section111Form').setVisible(true);
            // FormSectionedTable.getSection('Section111FormOutlet').setVisible(false);

            const orderedSectionKeys = ['11.1', '11.2', '11.3','11.4' ,'12.1', '12.2'];
            for (const sectionKey of orderedSectionKeys) {
                const loader = loadInletSectionLoader(sectionKey);
                if (!loader) continue;

                const item = findItemBySectionKey(items, sectionKey);
                if (!item?.INSPECTED_BY) continue;

                const matchingAttachments = attachmentGroups[normalize(item.QUESTION)] || [];
                await runLoader(loader, pageProxy, item, FormSectionedTable, matchingAttachments, flags, testdata._array, sectionKey);
            }

        } else if (type === "outlet") {
            FormSectionedTable.getSection('Section111Form').setVisible(true);
            // FormSectionedTable.getSection('Section111Form').setVisible(false);

            const orderedSectionKeys = ['11.1', '11.2', '11.3', '12.1', '12.2'];
            for (const sectionKey of orderedSectionKeys) {
                const loader = loadOutletSectionLoader(sectionKey);
                if (!loader) continue;

                const item = findItemBySectionKey(items, sectionKey);
                if (!item?.INSPECTED_BY) continue;

                const matchingAttachments = attachmentGroups[normalize(item.QUESTION)] || [];
                await runLoader(loader, pageProxy, item, FormSectionedTable, matchingAttachments, flags, testdata._array, sectionKey);
            }
        }

        clientAPI.dismissActivityIndicator();

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        console.error('❌ Fatal error in LoadSnorkelDataPage3:', error);
    }
}

// --- Helpers ---
function groupAttachmentsByQuestion(attachments = []) {
    const grouped = {};
    for (const attachment of attachments) {
        const rawKey = attachment.QUESTION || attachment.question || '';
        const key = normalize(rawKey);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(attachment);
    }
    return grouped;
}

function normalize(str) {
    return str?.replace(/\s+/g, ' ')?.trim();
}

function findItemBySectionKey(items, sectionKey) {
    return items.find(it => {
        const sectionKeyFromItem = it.QUESTION?.trimStart().split(' ')[0];
        return sectionKeyFromItem === sectionKey;
    });
}

async function runLoader(loader, pageProxy, item, FormSectionedTable, attachments, flags, testdata, sectionKey) {
    try {
        await loader(pageProxy, item, FormSectionedTable, attachments, flags, testdata);
    } catch (err) {
        console.error(`❌ Error running loader for section ${sectionKey}:`, err);
    }
}
