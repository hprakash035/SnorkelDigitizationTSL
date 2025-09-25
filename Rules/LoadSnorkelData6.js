import { loadSection171Data } from './loadSection171Data';
import { loadSection181Data } from './loadSection181Data';
import { loadSection182Data } from './loadSection182Data';
import { loadSection183Data } from './loadSection183Data';
import { loadSection184Data } from './loadSection184Data';
import { loadSection191Data } from './loadSection191Data';
import { loadSection192Data } from './loadSection192Data';
import { loadSection193Data } from './loadSection193Data';
import { loadSection194Data } from './loadSection194Data';
import { loadSection195Data } from './loadSection195Data';

export default async function LoadSnorkelDataPage6(clientAPI) {
    try {
        clientAPI.showActivityIndicator("Loading data...");

        const pageProxy = clientAPI.getPageProxy();
        const binding = pageProxy.getBindingObject();
        const readLink = binding['@odata.readLink'];
        const service = '/TRL_Snorkel_Digitization_TSL/Services/TRL_Snorkel_CAP_SRV.service';
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        const headerSection = FormSectionedTable.getSection('HeaderSection');

        // --- Read Data ---
        const [itemsResult, headerFiles, attachmentsResult, testdata] = await Promise.all([
            clientAPI.read(service, `${readLink}/qc_ITEMS`, [], ''),
            clientAPI.read(service, `${readLink}/headerFiles`, [], ''),
            clientAPI.read(service, `${readLink}/qc_ATTACHMENTS`, [], ''),
            clientAPI.read(service, `${readLink}/qc_TESTS`, [], ''),
        ]);

        const items = itemsResult._array;
        const attachments = attachmentsResult._array;
        const testArray = testdata._array;

        const attachmentGroups = groupAttachmentsBySectionKey(attachments);
        const flags = { next: false };

        FormSectionedTable.getSection('Section171Form').setVisible(true);

        const orderedSectionKeys = [
            '17.1', '18.1', '18.2', '18.3', '18.4', '19.1', '19.2', '19.3', '19.4', '19.5'
        ];

        for (const sectionKey of orderedSectionKeys) {
            const loader = getSectionLoader(sectionKey);
            if (!loader) {
                // console.warn(`⚠️ No loader found for section ${sectionKey}`);
                continue;
            }

            const item = findItemBySectionKey(items, sectionKey);
            if (!item || !item.INSPECTED_BY) {
                // console.log(`⛔ Skipping section ${sectionKey}: No item or INSPECTED_BY`);
                continue;
            }

            const attachmentsForSection = attachmentGroups[sectionKey] || [];
            // console.log(`📎 Attachments for ${sectionKey}:`, attachmentsForSection.length);

            try {
                await loader(
                    pageProxy,
                    item,
                    FormSectionedTable,
                    attachmentsForSection,
                    flags,
                    testArray
                );
                // console.log(`✅ Loader for ${sectionKey} executed successfully`);
            } catch (err) {
                // console.error(`❌ Error running loader for section ${sectionKey}:`, err);
            }
        }

        clientAPI.dismissActivityIndicator();

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        // console.error('❌ Fatal error in LoadSnorkelDataPage6:', error);
    }
}

// --- Group attachments by section key (e.g., "18.4") ---
function groupAttachmentsBySectionKey(attachments = []) {
    const grouped = {};
    for (const attachment of attachments) {
        const rawQuestion = attachment.QUESTION || attachment.question || '';
        const normalized = normalize(rawQuestion);
        const sectionKey = normalized.split(' ')[0]; // e.g., "18.4" from "18.4 Some description"
        if (!grouped[sectionKey]) grouped[sectionKey] = [];
        grouped[sectionKey].push(attachment);
    }
    return grouped;
}

function normalize(str) {
    return str?.replace(/\s+/g, ' ')?.trim();
}

function findItemBySectionKey(items, sectionKey) {
    return items.find(it => {
        const rawQuestion = it.QUESTION || '';
        const normalized = normalize(rawQuestion);
        const itemKey = normalized.split(' ')[0];
        return itemKey === sectionKey;
    });
}

function getSectionLoader(sectionKey) {
    const sectionLoaders = {
        '17.1': loadSection171Data,
        '18.1': loadSection181Data,
        '18.2': loadSection182Data,
        '18.3': loadSection183Data,
        '18.4': loadSection184Data,
        '19.1': loadSection191Data,
        '19.2': loadSection192Data,
        '19.3': loadSection193Data,
        '19.4': loadSection194Data,
        '19.5': loadSection195Data,
    };
    return sectionLoaders[sectionKey];
}

// Optional (unused in current logic)
async function processFileData(headerFile) {
    const base64File = headerFile.file;
    const fileName = headerFile.name;
    let cleanBase64 = base64File;
    if (base64File.startsWith('data:')) {
        cleanBase64 = base64File.split(',')[1];
    }
    const arrayBuffer = convertBase64ToArrayBuffer(cleanBase64);
    return {
        urlString: fileName,
        content: arrayBuffer,
        contentType: 'application/pdf',
        size: arrayBuffer.byteLength
    };
}

function convertBase64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
