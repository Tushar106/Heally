/// <reference types="cypress" />

describe("Doctor Login", () => {
    it("should allow a doctor to log in", () => {
      cy.visit("/signin");
  
      cy.get('input[name="email"]').type("rohit@gmail.com");
      cy.get('input[name="password"]').type("rohit@gmail.com");
      cy.get('button[type="submit"]').click();
  
      cy.url().should("include", "/dashboard");
  
     
      cy.contains('Dashboard');
    });
  });
  