

import { loadSection171DataOutlet } from './loadSection171DataOutlet';
import { loadSection172DataOutlet } from './loadSection172DataOutlet';
import { loadSection173DataOutlet } from './loadSection173DataOutlet';
import { loadSection174DataOutlet } from './loadSection174DataOutlet';
import { loadSection181DataOutlet } from './loadSection181DataOutlet';
import { loadSection182DataOutlet } from './loadSection182DataOutlet';
import { loadSection183DataOutlet } from './loadSection183DataOutlet';
import { loadSection184DataOutlet } from './loadSection184DataOutlet';
import { loadSection185DataOutlet } from './loadSection185DataOutlet';
import { loadSection191DataOutlet } from './loadSection191DataOutlet';
import { loadSection192DataOutlet } from './loadSection192DataOutlet';
import { loadSection193DataOutlet } from './loadSection193DataOutlet';
import { loadSection194DataOutlet } from './loadSection194DataOutlet';
export function loadOutletSectionLoader(sectionKey) {
    const sectionLoaders = {
        '17.1': loadSection171DataOutlet,
        '17.2': loadSection172DataOutlet,
        '17.3': loadSection173DataOutlet,
        '17.4': loadSection174DataOutlet,
        '18.1': loadSection181DataOutlet,
        '18.2': loadSection182DataOutlet,
        '18.3': loadSection183DataOutlet,
        '18.4': loadSection184DataOutlet,
        '18.5': loadSection185DataOutlet,
        '19.1': loadSection191DataOutlet,
        '19.2': loadSection192DataOutlet,
        '19.3': loadSection193DataOutlet,
        '19.4': loadSection194DataOutlet
    };

    return sectionLoaders[sectionKey];
}

