describe('Los estudiantes under monkeys', function () {
    it('visits los estudiantes and survives monkeys', function () {
        cy.visit('https://losestudiantes.co');
        cy.wait(1000);
        randomClick(10);
        randomEvent(10);
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomClick(monkeysLeft) {
    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function randomEvent(numberOfEvents) {
    if (numberOfEvents === 0) return;

    const events = ['clickLink', 'fillTextField', 'selectComboValue', 'clickButton'];
    const randomEventToEvaluate = events[getRandomInt(0, events.length)];

    cy.log(`Performing: ${randomEvent}`);

    if (randomEventToEvaluate === 'clickLink') {
        evaluateAction('a', $links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
            }
        });
    }

    if (randomEventToEvaluate === 'fillTextField') {
        evaluateAction('input', $inputs => {
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            if (!Cypress.dom.isHidden(randomInput)) {
                cy.wrap(randomInput).type('Test', { force: true });
            }
        });
    }

    if (randomEventToEvaluate === 'selectComboValue') {
        evaluateAction('select', $selects => {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length));
            if (!Cypress.dom.isHidden(randomSelect)) {
                cy.wrap(randomSelect).select('Test', { force: true });
            }
        });
    }

    if (randomEventToEvaluate === 'clickButton') {
        evaluateAction('button', $buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if (!Cypress.dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({ force: true });
            }
        });
    }

    cy.wait(1000);
    cy.log(`Events left: ${numberOfEvents}`);
    randomEvent(numberOfEvents - 1);
}

function evaluateAction(tag, actionToExecute) {
    cy.get("body").then(($body) => {
        if ($body.find(tag).length) {
            cy.get(tag).then($items => {
                actionToExecute($items);
            });
        }
    });
}