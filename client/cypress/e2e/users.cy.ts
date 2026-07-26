import { usersApi } from '../support/usersApi';

describe('Users directory', () => {
  beforeEach(() => {
    cy.intercept(usersApi).as('getUsers');
    cy.visit('/');
    cy.wait('@getUsers');
  });

  it('loads the directory', () => {
    cy.get('[data-testid="users-list"]').should('be.visible');
    cy.get('[data-testid="users-list-item"]').should('have.length.at.least', 1);

    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="sort-by-select"]').should('be.visible');
    cy.get('[data-testid="sort-direction-select"]').should('be.visible');

    cy.get('[data-testid="filter-box-count"]')
      .invoke('text')
      .should('match', /\d+ users? found/);

    cy.get('[data-testid="filter-group"]').should('have.length', 2);
    cy.get('[data-testid="filter-group-heading"]').first().should('contain.text', 'Nationalities');
  });

  it('searches users and updates the URL', () => {
    cy.intercept({ ...usersApi, query: { search: 'Ali' } }).as('searchUsers');

    cy.get('[data-testid="search-input"]').clear().type('Ali', { delay: 100 });

    cy.location('search').should((query) => {
      expect(new URLSearchParams(query).get('search')).to.eq('Ali');
    });

    cy.wait('@searchUsers');

    cy.get('[data-testid="user-name"]')
      .should('have.length.at.least', 1)
      .each(($name) => {
        expect($name.text().toLowerCase()).to.contain('ali');
      });
  });

  it('applies a nationality filter', () => {
    cy.get('[data-testid="filter-group"]')
      .first()
      .within(() => {
        cy.get('[data-testid^="filter-item-nationalities-"]')
          .not('[data-testid$="-label"]')
          .not('[data-testid$="-count"]')
          .first()
          .as('nationalityFilter');
      });

    cy.get('@nationalityFilter')
      .invoke('attr', 'data-testid')
      .then((testId) => {
        const nationality = testId!.replace('filter-item-nationalities-', '');

        cy.intercept({
          ...usersApi,
          query: { nationalities: nationality },
        }).as('filterUsers');

        cy.get('@nationalityFilter').click();

        cy.get('[data-testid="selected-badge"]').should('contain.text', nationality);
        cy.location('search').should((query) => {
          expect(new URLSearchParams(query).get('nationalities')).to.eq(nationality);
        });

        cy.wait('@filterUsers');

        cy.get('[data-testid="user-nationality"]')
          .should('have.length.at.least', 1)
          .each(($el) => {
            expect($el.text()).to.eq(nationality);
          });
      });
  });

  it('clears all selected filters', () => {
    cy.get('[data-testid="filter-group"]')
      .first()
      .within(() => {
        cy.get('[data-testid^="filter-item-nationalities-"]')
          .not('[data-testid$="-label"]')
          .not('[data-testid$="-count"]')
          .first()
          .as('nationalityFilter');
      });

    cy.get('@nationalityFilter')
      .invoke('attr', 'data-testid')
      .then((testId) => {
        const nationality = testId!.replace('filter-item-nationalities-', '');

        cy.intercept({
          ...usersApi,
          query: { nationalities: nationality },
        }).as('filterUsers');

        cy.get('@nationalityFilter').click();
        cy.wait('@filterUsers');

        cy.get('[data-testid="selected-badges"]').should('be.visible');
        cy.get('[data-testid="selected-badge"]').should('contain.text', nationality);

        cy.get('[data-testid="selected-badges-clear-all"]').click();

        cy.get('[data-testid="selected-badges"]').should('not.exist');
        cy.location('search').should((query) => {
          expect(new URLSearchParams(query).get('nationalities')).to.eq(null);
        });
        cy.get('[data-testid="users-list"]').should('be.visible');
        cy.get('[data-testid="users-list-item"]').should('have.length.at.least', 1);
      });
  });
});
