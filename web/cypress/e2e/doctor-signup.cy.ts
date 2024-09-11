/// <reference types="cypress" />

describe("Doctor Signup ", () => {
  it("should allow a doctor to sign up", () => {
    const uniqueEmail = `himanshu${Date.now()}@gmail.com`;
    cy.visit("/signup");

    cy.get('input[name="name"]').type("Himanshu");
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="hospital"]').type("IIT BHU Medical Hospital");
    cy.get('input[name="fees"]').type("500");
    cy.get('[name="specialty"]').select("Cardiology", {force:true}); // Click on the dropdown placeholder to open it// Replace 'div' with the actual element 
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");

   
    cy.contains('Dashboard');
  });
});
