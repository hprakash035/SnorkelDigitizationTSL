import { loadSection141Data } from './loadSection141Data';
import { loadSection151Data } from './loadSection151Data';
import { loadSection152Data } from './loadSection152Data';
import { loadSection153Data } from './loadSection153Data';

export function loadInletSectionLoader(sectionKey) {
    const sectionLoaders = {
        '14.1': loadSection141Data,
        '15.1': loadSection151Data,
        '15.2': loadSection152Data,
        '15.3': loadSection153Data,

    };
    return sectionLoaders[sectionKey];
}
