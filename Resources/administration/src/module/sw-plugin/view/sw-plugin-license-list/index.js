import { Component, Mixin } from 'src/core/shopware';
import template from './sw-plugin-license-list.html.twig';
import './sw-plugin-license-list.scss';

Component.register('sw-plugin-license-list', {
    template,

    inject: ['storeService'],

    mixins: [
        Mixin.getByName('listing'),
        Mixin.getByName('notification')
    ],

    data() {
        return {
            licenses: [],
            isLoading: false,
            showLoginModal: false
        };
    },

    watch: {
        '$root.$i18n.locale'() {
            this.getList();
        }
    },

    methods: {

        onDownload(pluginName) {
            this.storeService.downloadPlugin(pluginName).then(() => {
                this.createNotificationSuccess({
                    title: this.$tc('sw-plugin.general.titleDownloadSuccess'),
                    message: this.$tc('sw-plugin.general.messageDownloadSuccess')
                });
                this.getList();
            });
        },

        getList() {
            this.isLoading = true;
            this.storeService.checkLogin().then((result) => {
                if (result) {
                    this.loadLicenses();
                    return;
                }
                this.showLoginModal = true;
            }).catch(() => {
                this.showLoginModal = true;
            });
        },

        loadLicenses() {
            this.storeService.getLicenseList().then((response) => {
                this.licenses = response.items;
                this.total = response.total;
                this.isLoading = false;
            });
        },

        loginSuccess() {
            this.showLoginModal = false;
            this.loadLicenses();
        }
    }
});
