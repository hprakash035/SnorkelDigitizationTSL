import { loadSection131Data } from './loadSection131Data';
import { loadSection132Data } from './loadSection132Data';
import { loadSection133Data } from './loadSection133Data';
import { loadSection134Data } from './loadSection134Data';
import { loadSection135Data } from './loadSection135Data';
import { loadSection136Data } from './loadSection136Data';

import { loadSection137Data } from './loadSection137Data';

export function loadInletSectionLoader(sectionKey) {
    const sectionLoaders = {
        '13.1': loadSection131Data,
        '13.2': loadSection132Data,
        '13.3': loadSection133Data,
        '13.4': loadSection134Data,
        '13.5': loadSection135Data,
        '13.6': loadSection136Data,
        '13.7': loadSection137Data
    };
    return sectionLoaders[sectionKey];
}
