# True Travel – MERN Stack Project

This project aims to solve the problem of finding and booking travel accommodations and tourist places in one platform. 

Users can explore listings, book trips, and also add their own listings, making it a community-driven travel platform.

# Solution/Features: 
- User authentication (login/signup)
- Browse travel destinations
- Book trips
- Responsive UI

# Tech Stack
- Frontend: html,css,js
- Backend: Node.js, Express
- Database: MongoDB

# Approach

I divided the project into multiple phases:

Phase 1:
- Set up project structure
- Built listing system (CRUD operations)

Phase 2:
- Implemented authentication system using JWT
- Secured routes for users

Phase 3:
- Connected frontend with backend APIs
- Improved UI and responsiveness

The project follows a modular structure separating frontend and backend logic. 

date 29/03/2026

## New Feature: Listing Creation

- Users can add listings with validation
- Minimum 150 character description
- Default image handling added
- Added a bulk data initialization feature to seed the database with sample listings for development and testing purposes.
- A new page to display data of any listing when selected from the listing.

## Challenges Faced

- MongoDB connection was not initialized before server start
- Wrong folder execution caused old code to run
- Validation errors were not handled properly (caused silent failures)

## Learnings

- Always connect DB before starting server
- Use try-catch in async routes
- Ensure correct working directory before running code
- Use POST instead of GET for data creation

