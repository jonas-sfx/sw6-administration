const GeneralPageObject = require('../sw-general.page-object');

class RuleBuilderPageObject extends GeneralPageObject {
    constructor(browser) {
        super(browser);

        this.elements = {
            ...this.elements,
            ...{
                columnName: '.sw-settings-rule-list__column-name',
                ruleSaveAction: '.sw-settings-rule-detail__save-action',
                ruleDeleteAction: '.sw-condition-or-container__actions--delete',
                conditionOrContainer: '.sw-condition-container__or-child',
                conditionAndContainer: '.sw-condition-container__and-child',
                subConditionContainer: '.container-condition-level__is--even',
                ruleFieldCondition: '.field--condition',
                orSpacer: '.condition-content__spacer--or',
                andSpacer: '.condition-content__spacer--and',
                baseCondition: '.sw-condition-base'
            }
        };
    }

    createBasicRule(name) {
        this.browser
            .fillField('input[name=sw-field--rule-name]', name)
            .fillField('input[name=sw-field--rule-priority]', '1')
            .fillField('textarea[name=sw-field--rule-description]', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');

        this.createBasicSelectCondition({
            type: 'Currency',
            operator: 'Is none of',
            ruleSelector: `${this.elements.conditionOrContainer}--0`,
            value: 'Euro',
            isMulti: true
        });

        this.browser
            .click(this.elements.ruleSaveAction)
            .checkNotification(`The rule "${name}" has been saved successfully.`);
    }

    createBasicSelectCondition(ruleData) {
        this.browser
            .fillSwSelectComponent(`${ruleData.ruleSelector} ${this.elements.ruleFieldCondition}`, {
                value: ruleData.type,
                isMulti: false,
                searchTerm: ruleData.type
            })
            .fillSwSelectComponent(`${ruleData.ruleSelector} .field--main`, {
                value: ruleData.value,
                isMulti: ruleData.isMulti,
                searchTerm: ruleData.value
            });

        if (ruleData.operator) {
            this.browser
                .fillSwSelectComponent(`${ruleData.ruleSelector} .sw-condition-operator-select`, {
                    value: ruleData.operator,
                    isMulti: false,
                    searchTerm: ruleData.operator
                });
        }
    }

    createBasicInputCondition(ruleData) {
        this.browser
            .fillSwSelectComponent(`${ruleData.ruleSelector} ${this.elements.ruleFieldCondition}`, {
                value: ruleData.type,
                isMulti: false,
                searchTerm: ruleData.type
            })
            .fillField(`input[name=${ruleData.inputName}]`, ruleData.value);

        if (ruleData.operator) {
            this.browser
                .fillSwSelectComponent(`${ruleData.ruleSelector} .sw-condition-operator-select`, {
                    value: ruleData.operator,
                    isMulti: false,
                    searchTerm: ruleData.operator
                });
        }
    }

    createCombinedInputSelectCondition(ruleData) {
        this.browser
            .fillSwSelectComponent(`${ruleData.ruleSelector} ${this.elements.ruleFieldCondition}`, {
                value: ruleData.type,
                isMulti: false,
                searchTerm: ruleData.type
            })
            .fillSwSelectComponent(`${ruleData.ruleSelector} .sw-select[name=id]`, {
                value: ruleData.firstValue,
                isMulti: ruleData.isMulti,
                searchTerm: ruleData.firstValue
            })
            .fillSwSelectComponent(`${ruleData.ruleSelector} .sw-condition-operator-select`, {
                value: ruleData.operator,
                isMulti: ruleData.isMulti,
                searchTerm: ruleData.operator
            })
            .fillField(`${ruleData.ruleSelector} input[name=${ruleData.inputName}]`, ruleData.secondValue);
    }

    createDateRangeCondition(ruleData) {
        this.browser
            .fillSwSelectComponent(`${ruleData.ruleSelector} ${this.elements.ruleFieldCondition}`, {
                value: ruleData.type,
                isMulti: false,
                searchTerm: ruleData.type
            });

        this.browser.fillSwSelectComponent(`${ruleData.ruleSelector} .sw-select[name=useTime]`, {
            value: ruleData.useTime ? 'Use time' : 'Don\'t use time',
            isMulti: false,
            searchTerm: String(ruleData.useTime)
        });

        this.browser
            .fillDateField('.field--from-date input.input', ruleData.fromDate)
            .fillDateField('.field--to-date input.input', ruleData.toDate);
    }
}

module.exports = (browser) => {
    return new RuleBuilderPageObject(browser);
};
