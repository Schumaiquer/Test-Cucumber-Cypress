Feature: The Redmine Demo
the open application I will run some features

Background: Open the redmine page
Given I open Redmine page

  Scenario: Creating a new user
    Then creating a new user

  Scenario: create new project flow
    Given create new project
    When create 30 new tasks
    Then validate the 29th task

