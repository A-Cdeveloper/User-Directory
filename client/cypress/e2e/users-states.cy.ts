import { usersApi } from '../support/usersApi';

const emptyUsersResponse = {
  users: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  },
  filters: {
    nationalities: [],
    hobbies: [],
  },
};

describe('Users directory UI states', () => {
  it('shows loading skeleton while users are fetching', () => {
    cy.intercept(usersApi, (req) => {
      req.reply({
        delay: 1000,
        body: emptyUsersResponse,
      });
    }).as('slowUsers');

    cy.visit('/');

    cy.get('[data-testid="home-page-skeleton"]').should('be.visible');
    cy.get('[data-testid="home-page-skeleton"]').should('contain.text', 'Loading users');

    cy.wait('@slowUsers');
  });

  it('shows an error message when the users request fails', () => {
    cy.intercept(usersApi, {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('failedUsers');

    cy.visit('/');
    cy.wait('@failedUsers');

    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain.text', 'Internal server error');
    cy.get('[data-testid="users-list"]').should('not.exist');
  });

  it('shows empty state when there are no users', () => {
    cy.intercept(usersApi, {
      statusCode: 200,
      body: emptyUsersResponse,
    }).as('emptyUsers');

    cy.visit('/');
    cy.wait('@emptyUsers');

    cy.get('[data-testid="users-list-empty"]').should('be.visible');
    cy.get('[data-testid="users-list-empty"]').should('contain.text', 'No users found');
    cy.get('[data-testid="users-list-item"]').should('not.exist');
  });
});
