import { loadSection131DataOutlet } from './loadSection131DataOutlet';
 import { loadSection141DataOutlet } from './loadSection141DataOutlet';
 import { loadSection142DataOutlet } from './loadSection142DataOutlet';
 import { loadSection151DataOutlet } from './loadSection151DataOutlet';
 import { loadSection161DataOutlet } from './loadSection161DataOutlet';
 import { loadSection162DataOutlet } from './loadSection162DataOutlet';
 import { loadSection163DataOutlet } from './loadSection163DataOutlet';

export function loadOutletSectionLoader(sectionKey) {
    const sectionLoaders = {
        '13.1': loadSection131DataOutlet,
         '14.1': loadSection141DataOutlet,
         '14.2': loadSection142DataOutlet,
         '15.1': loadSection151DataOutlet,
         '16.1': loadSection161DataOutlet,
         '16.2': loadSection162DataOutlet,
         '16.3': loadSection163DataOutlet
    };
    return sectionLoaders[sectionKey];
}
