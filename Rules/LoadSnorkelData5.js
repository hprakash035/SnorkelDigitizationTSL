import { loadInletSectionLoader } from './loadInletSectionLoader5';
import { loadOutletSectionLoader } from './loadOutletSectionLoader5';

export default async function LoadSnorkelDataPage5(clientAPI) {
    try {
       
        clientAPI.showActivityIndicator("Loading data...");

        const pageProxy = clientAPI.getPageProxy();
        const binding = pageProxy.getBindingObject();
        const readLink = binding['@odata.readLink'];
        const type = binding.TYPE?.toLowerCase();

        

        const service = '/TRL_Snorkel_Digitization_TSL/Services/TRL_Snorkel_CAP_SRV.service';
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        // --- Read Data in parallel ---
       
        const [itemsResult, headerFiles, attachmentsResult, testdata] = await Promise.all([
            clientAPI.read(service, `${readLink}/qc_ITEMS`, [], ''),
            clientAPI.read(service, `${readLink}/headerFiles`, [], ''),
            clientAPI.read(service, `${readLink}/qc_ATTACHMENTS`, [], ''),
            clientAPI.read(service, `${readLink}/qc_TESTS`, [], ''),
        ]);

        const items = itemsResult._array;
        const attachments = attachmentsResult._array;
        const testArray = testdata._array;

      

        // ✅ Group attachments by section number only (e.g., "15.2")
        const attachmentGroups = groupAttachmentsBySectionKey(attachments);
       

        const flags = { next: false };

        if (type === "inlet") {
            
            FormSectionedTable.getSection('Section141Form').setVisible(true);
            FormSectionedTable.getSection('Section171FormOutlet').setVisible(false);

            const inletSections = ['14.1', '15.1', '15.2', '16.1', '17.1', '17.2', '17.3', '17.4'];
            for (const sectionKey of inletSections) {
                // console.log(`🔍 Processing INLET section: ${sectionKey}`);

                const loader = loadInletSectionLoader(sectionKey);
                if (!loader) {
                    // console.warn(`⚠️ No loader found for inlet section ${sectionKey}`);
                    continue;
                }

                const item = findItemBySectionKey(items, sectionKey);
                if (!item?.INSPECTED_BY) {
                    
                    continue;
                }

                const attachmentsForSection = attachmentGroups[sectionKey] || [];
                

                await runLoader(loader, pageProxy, item, FormSectionedTable, attachmentsForSection, flags, testArray, sectionKey);
            }

        } else if (type === "outlet") {
           
            FormSectionedTable.getSection('Section171FormOutlet').setVisible(true);
            FormSectionedTable.getSection('Section141Form').setVisible(false);

            const outletSections = ['17.1', '17.2', '17.3', '17.4', '18.1', '18.2', '18.3', '18.4', '18.5', '19.1', '19.2', '19.3', '19.4'];
            for (const sectionKey of outletSections) {
               

                const loader = loadOutletSectionLoader(sectionKey);
                if (!loader) {
                    
                    continue;
                }

                const item = findItemBySectionKey(items, sectionKey);
                if (!item?.INSPECTED_BY) {
                    
                    continue;
                }

                const attachmentsForSection = attachmentGroups[sectionKey] || [];
               

                await runLoader(loader, pageProxy, item, FormSectionedTable, attachmentsForSection, flags, testArray, sectionKey);
            }

        } else {
           
        }

        clientAPI.dismissActivityIndicator();
       

    } catch (error) {
        clientAPI.dismissActivityIndicator();
        
    }
}

// === 🔧 Utility Functions ===

function groupAttachmentsBySectionKey(attachments = []) {
    const grouped = {};
    for (const attachment of attachments) {
        const rawQuestion = attachment.QUESTION || attachment.question || '';
        const normalized = normalize(rawQuestion);
        const sectionKey = normalized.split(' ')[0]; // e.g., "15.2" from "15.2 The gap between..."
        if (!grouped[sectionKey]) grouped[sectionKey] = [];
        grouped[sectionKey].push(attachment);
    }
    return grouped;
}

function normalize(str) {
    return str?.replace(/\s+/g, ' ')?.trim();
}

function findItemBySectionKey(items, sectionKey) {
    return items.find(item => {
        const raw = item.QUESTION || '';
        const normalized = normalize(raw);
        const itemKey = normalized.split(' ')[0];
        return itemKey === sectionKey;
    });
}

async function runLoader(loader, pageProxy, item, FormSectionedTable, attachments, flags, testdata, sectionKey) {
    try {
       
        await loader(pageProxy, item, FormSectionedTable, attachments, flags, testdata);
       
    } catch (err) {
        
    }
}
