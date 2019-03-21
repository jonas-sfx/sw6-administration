import { Module } from 'src/core/shopware';

import './component/sw-listing';
import './component/sw-one-to-many-grid';
import './component/sw-single-select';
import './component/sw-single-select-option';
import './component/sw-entity-single-select';
import './component/sw-entity-multi-select';
import './component/sw-multi-select';
import './component/sw-multi-select-option';
import './page/sw-show-case-list';
import './page/sw-show-case-detail';
import './view/sw-show-case-detail-base';

Module.register('sw-show-case', {
    type: 'core',
    name: 'Show case module',
    color: '#9AA8B5',
    icon: 'default-action-settings',

    routes: {
        index: {
            components: {
                default: 'sw-show-case-list'
            },
            path: 'index'
        },
        detail: {
            component: 'sw-show-case-detail',
            path: 'detail/:id',
            redirect: {
                name: 'sw.show.case.detail.base'
            },
            children: {
                base: {
                    component: 'sw-show-case-detail-base',
                    path: 'base',
                    meta: {
                        parentPath: 'sw.show.case.index'
                    }
                }
            }
        }
    },

    navigation: [{
        id: 'sw-show-case',
        label: 'Show case',
        color: '#F88962',
        path: 'sw.show.case.index',
        icon: 'default-avatar-multiple',
        position: 40
    }]
});
