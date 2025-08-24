<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p> -->

## Introduction

Classut (School Management System) is a comprehensive platform owned by Innovou, an organization that acts as a super-admin to onboard and manage multiple schools. The system is designed to streamline academic operations such as student enrollment, timetable management, e-library, performance tracking, resource sharing, and more.

Built with Nest.js, TypeScript, and a scalable frontend architecture, this system ensures modularity, security, and maintainability. The goal is to provide a unified interface for schools to digitize and efficiently manage their academic and administrative workflows.

This document outlines the coding conventions and best practices to ensure consistency, readability, and maintainability across the anchor-sms project.

---

## General Guidelines

1. **Project Naming**
   - Use `snake_case` for all directory and `kebab-case` for file names.
   - Keep names descriptive but concise.

2. **Function Naming**
   - Use `camelCase` for all function names.
   - Functions should describe their purpose clearly.

3. **Variable Naming**
   - Use `camelCase` for variables.
   - Constants should be in `UPPER_CASE`.

4. **Component Naming**
   - Use `PascalCase` for React components.
   - Each component should reside in its own file.

5. **Styling**
   - Use CSS modules or styled-components with consistent naming conventions.
   - File names for styles should match their associated component or page.

6. **Imports**
   - Group imports logically: external libraries first, followed by internal imports.
   - Use absolute imports where applicable.

7. **File Structure**
   - Group related functionalities into directories.
   - Avoid deeply nested structures unless necessary.

---

---

## Code Style

1. **Indentation**: Use 2 spaces for indentation.
2. **Quotes**: Use single quotes for strings, except where double quotes are necessary.
3. **Semicolons**: Always use semicolons.
4. **Line Length**: Limit lines to 80 characters where possible.
5. **Commenting**:
   - Use `//` for inline comments.
   - Use `/** */` for documentation-style comments.
6. **Testing**:
   - Write unit tests for components and utility functions.
   - Place test files alongside the code they test, with the `.test.tsx` or `.test.ts` suffix.

---

## Commit Messages

- Follow the format: `<type>: (<scope>)<description>`
- Example: `feat: (auth)add login functionality`
- Types include: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.

---

By following these conventions, we aim to create a clean and scalable codebase for Koresmart. Adhering to these standards will facilitate collaboration, reduce technical debt, and ensure the success of the project.
