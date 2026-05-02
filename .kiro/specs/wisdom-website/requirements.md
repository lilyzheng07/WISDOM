# Requirements Document

## Introduction

WISDOM ("The future for the wise") is a web platform designed to connect women and allies in STEM fields. It provides a community space for discussion, professional networking, event discovery, mentorship, and career guidance. The platform targets students, early-career professionals, and established STEM professionals, with particular attention to supporting minors safely. The visual identity uses a purple-toned colour palette (primary: #BE97C6, side theme: #634587, text: #4B5267, white: #FDFFFC, highlight: #325F85).

---

## Glossary

- **WISDOM**: The web platform described in this document.
- **User**: A registered member of the WISDOM platform.
- **Minor**: A User who is under 18 years of age.
- **Admin**: A privileged User with moderation and management capabilities.
- **Discussion Board**: A categorised space where Users can post and reply to discussion threads.
- **Thread**: A single discussion topic created by a User within a Discussion Board.
- **Connection**: A one-way or mutual professional link between two Users.
- **Event**: A networking, catchup, internship, or mentorship opportunity listed on the platform.
- **Enquiry**: A support request submitted by a User and responded to by an Admin.
- **Sponsor**: An organisation whose advertisement is displayed on the platform.
- **Sidebar**: The collapsible left-side navigation panel.
- **Profile**: A User's personal page showing their details, disciplines, and connections.
- **Tag**: A keyword label that can be applied to a User profile or Discussion Thread.
- **Location**: An approximate geographic identifier at city-level granularity.
- **STEM Category**: A top-level discipline grouping (Science, Technology, Engineering, Mathematics).
- **Sub-field**: A specific discipline within a STEM Category (e.g., Biology within Science, Mechatronic within Engineering).
- **Spotlight Profile**: A curated, generated example profile of a woman in a STEM field, used in the "Women in the Field" section.

---

## Requirements

### Requirement 1: Visual Design and Theming

**User Story:** As a User, I want the platform to have a consistent, accessible visual identity, so that I can navigate it comfortably and recognise the WISDOM brand.

#### Acceptance Criteria

1. THE WISDOM Platform SHALL apply the primary theme colour `#BE97C6` as the dominant background and branding colour throughout all pages.
2. THE WISDOM Platform SHALL use `#FDFFFC` as the white/background surface colour for content areas.
3. THE WISDOM Platform SHALL render all body text in colour `#4B5267`.
4. THE WISDOM Platform SHALL apply the side theme colour `#634587` to the sidebar and secondary UI elements.
5. WHEN a User hovers over an interactive button, THE WISDOM Platform SHALL change the button highlight colour to `#325F85`.
6. THE WISDOM Platform SHALL maintain a colour contrast ratio of at least 4.5:1 between text and its background surface on all pages, in compliance with WCAG 2.1 AA.

---

### Requirement 2: Page Layout and Navigation

**User Story:** As a User, I want a clear, consistent page layout with easy navigation, so that I can move between features without confusion.

#### Acceptance Criteria

1. THE WISDOM Platform SHALL display a collapsible sidebar on the left side of every authenticated page, containing navigation links to: Discussion Boards, Connecting Platform, Events, Profile, and Settings.
2. WHEN a User clicks the sidebar toggle control, THE Sidebar SHALL expand or collapse without reloading the page.
3. THE Home Page SHALL display a horizontal-scrolling highlight reel at the top of the main content area, containing Women in the Field spotlights and Hot Topics for the Day.
4. THE Home Page SHALL display a vertical-scrolling section below the highlight reel, containing recently visited Discussion Boards and recommended new Discussion Boards based on the User's recent search history.
5. THE Home Page SHALL display a right-side panel showing Upcoming Events in the User's nearby area.
6. THE Home Page SHALL display a Sponsors section featuring advertisements from approved Sponsors.
7. THE WISDOM Platform SHALL be responsive and render correctly on viewport widths from 375px (mobile) to 1920px (desktop).

---

### Requirement 3: User Registration and Sign-Up

**User Story:** As a visitor, I want to create a WISDOM account with relevant details, so that I can access the platform's features tailored to my background and goals.

#### Acceptance Criteria

1. THE Sign-Up Form SHALL collect the following fields: full name, age, city-level location, interested STEM disciplines (selected via a two-level hierarchy: top-level STEM category followed by a specific sub-field within that category), and participation role (seeking help / here to help).
2. WHEN a visitor submits the Sign-Up Form, THE Registration System SHALL validate that all required fields are completed before creating an account.
3. IF a visitor submits the Sign-Up Form with an age value below 15, THEN THE Registration System SHALL reject the submission and display a message stating the minimum age requirement.
4. WHEN a visitor registers with an age between 15 and 17 inclusive, THE Registration System SHALL flag the account as a Minor account and apply age-appropriate content restrictions.
5. THE Sign-Up Form SHALL allow Users to select one or more Tags from a predefined list to describe their interests and background.
6. THE Registration System SHALL store the User's location at city-level granularity only, and SHALL NOT store street-level or precise GPS coordinates.
7. WHEN a User account is successfully created, THE Registration System SHALL redirect the User to the Home Page.

---

### Requirement 3a: STEM Disciplines Hierarchy

**User Story:** As a visitor, I want to select my STEM disciplines using a structured category and sub-field hierarchy, so that my profile accurately reflects my area of interest.

#### Acceptance Criteria

1. THE Sign-Up Form SHALL present STEM disciplines as a two-level selection: the User first selects a top-level STEM Category, then selects one or more Sub-fields within that category.
2. THE Discipline System SHALL support the following STEM Categories and Sub-fields:
   - **Science**: Research Sciences, Biology, Chemistry, Psychology
   - **Technology**: Biotechnology, and other technology sub-fields as defined by the Admin
   - **Engineering**: Mechatronic, Chemical, Mechanical, Electronic
   - **Mathematics**: Actuarial Studies, Statistics, Mathematical Research
3. WHEN a User selects a STEM Category, THE Sign-Up Form SHALL display only the Sub-fields belonging to that category.
4. THE Sign-Up Form SHALL allow a User to select Sub-fields from multiple STEM Categories.
5. THE Profile Page SHALL display the User's selected STEM Categories and their corresponding Sub-fields.
6. WHEN a User updates their discipline selections on the Profile Page, THE Discipline System SHALL save the updated selections and reflect them immediately on the Profile Page.

---

### Requirement 4: Discussion Boards

**User Story:** As a User, I want to browse and participate in discussion boards organised by STEM field, so that I can ask questions, seek help, and engage with the community.

#### Acceptance Criteria

1. THE Discussion Board System SHALL organise boards by STEM field categories, allowing Users to search boards by keyword.
2. WHEN a User enters a keyword in the Discussion Board search field, THE Discussion Board System SHALL return all boards and threads whose title or description contains the keyword within 2 seconds.
3. THE Discussion Board Page SHALL display an "Add New Discussion" button in the top-right corner of the page.
4. WHEN a User clicks the "Add New Discussion" button, THE Discussion Board System SHALL display a form containing fields for: topic title, detail questions, and description.
5. WHEN a User submits a completed new discussion form, THE Discussion Board System SHALL publish the Thread to the relevant Discussion Board and make it visible to all Users.
6. THE Discussion Board System SHALL allow Users to reply to existing Threads, creating nested discussion conversations.
7. WHILE a Thread is under Admin review, THE Discussion Board System SHALL display the Thread as pending and restrict it from public view until approved.
8. IF a Thread contains content flagged by the Admin as violating community guidelines, THEN THE Discussion Board System SHALL remove the Thread from public view and notify the Thread author.
9. WHERE a User is a Minor, THE Discussion Board System SHALL restrict the User from viewing Threads marked as adult-only content.

---

### Requirement 5: Connecting Platform

**User Story:** As a User, I want to discover and connect with STEM professionals, so that I can build my professional network.

#### Acceptance Criteria

1. THE Connecting Platform SHALL display STEM professionals as cards, each showing: full name, organisation, speciality, and a "Chat" button.
2. THE Connecting Platform SHALL display a section for STEM professionals located in the User's nearby area, based on the User's stored city-level location.
3. WHEN a User clicks the "Chat" button on a professional's card, THE Connecting Platform SHALL present the User with two options: send a connection request to that professional, or submit a question to that professional asking for advice.
4. WHEN a User selects the "send a connection request" option, THE Connecting Platform SHALL submit a connection request to the professional.
5. WHEN a User selects the "ask for advice" option, THE Connecting Platform SHALL present a form for the User to compose and submit a question to the professional.
6. WHEN a professional accepts a connection request, THE Connecting Platform SHALL establish a Connection between the two Users.
7. THE Connecting Platform SHALL NOT provide a real-time direct messaging or chat feature; all interaction SHALL be initiated through connection requests or advice questions only.
8. WHERE a User is a Minor, THE Connecting Platform SHALL require Admin approval before establishing a Connection between the Minor and an adult User.

---

### Requirement 6: Events

**User Story:** As a User, I want to discover, create, and attend networking events and opportunities in my area, so that I can grow my career and meet peers.

#### Acceptance Criteria

1. THE Events System SHALL display existing events filtered by the User's city-level location by default.
2. THE Events System SHALL categorise events into the following types: Networking, Catchup, Internship Opportunity, and Mentorship Opportunity.
3. WHEN a User submits a new event form with a title, date, time, location, type, and description, THE Events System SHALL publish the event and make it visible to Users in the relevant area.
4. THE Home Page right-side panel SHALL display upcoming events within the User's nearby area, sorted by date in ascending order.
5. WHEN a User clicks on an event listing, THE Events System SHALL display the full event details including title, date, time, location, type, description, and organiser.
6. IF a User attempts to create an event without completing all required fields, THEN THE Events System SHALL display a validation error identifying the missing fields.

---

### Requirement 7: Enquiries

**User Story:** As a User, I want to submit a personal enquiry to the WISDOM team, so that I can receive tailored guidance when I am unsure how to navigate STEM pathways.

#### Acceptance Criteria

1. THE Enquiry System SHALL provide a form where Users can enter a free-text description of their need or question.
2. WHEN a User submits an Enquiry, THE Enquiry System SHALL store the submission and notify the Admin team.
3. WHEN an Admin responds to an Enquiry, THE Enquiry System SHALL deliver the response to the submitting User's account notification area.
4. THE Enquiry System SHALL display the status of each submitted Enquiry (Pending, In Progress, Resolved) to the submitting User.
5. IF a User submits an Enquiry with an empty description field, THEN THE Enquiry System SHALL reject the submission and prompt the User to enter a description.

---

### Requirement 8: Meet the Team

**User Story:** As a visitor or User, I want to learn about the WISDOM team and contact them, so that I can understand who is behind the platform and reach out if needed.

#### Acceptance Criteria

1. THE Meet the Team Page SHALL display profile photos and names for at least four team members in a grid layout.
2. THE Meet the Team Page SHALL embed a Google Form for contact enquiries, using a URL provided by the Admin.
3. WHEN the Admin updates the Google Form URL in the platform settings, THE Meet the Team Page SHALL display the updated form without requiring a code deployment.
4. THE Meet the Team Page SHALL be accessible to both authenticated Users and unauthenticated visitors.

---

### Requirement 9: Home Page Content — Highlights and Recommendations

**User Story:** As a User, I want the Home Page to surface relevant content and recommendations, so that I can discover new topics and communities without manual searching.

#### Acceptance Criteria

1. THE Home Page SHALL display a "Women in the Field" spotlight section featuring curated Spotlight Profiles of women in STEM; for the prototype, these SHALL be generated example profiles (e.g., a computer science engineer at a quantitative finance firm) covering a range of STEM fields, and SHALL NOT require user submission.
2. THE Home Page SHALL display a "Hot Topic for the Day" section showing the most-engaged Discussion Thread from the past 24 hours.
3. THE Home Page SHALL display a "Recommendation" section showing Discussion Boards suggested based on the User's selected disciplines and Tags.
4. WHEN a User has no search history, THE Home Page SHALL display default recommended Discussion Boards based on the User's selected disciplines.
5. THE Home Page SHALL display a "Recently Visited" section showing the last five Discussion Boards the User visited, in reverse chronological order.

---

### Requirement 10: Admin Moderation

**User Story:** As an Admin, I want tools to monitor and moderate platform content, so that I can maintain a safe and respectful community.

#### Acceptance Criteria

1. THE Admin System SHALL allow Admins to review, approve, or reject newly submitted Discussion Threads before they are published.
2. THE Admin System SHALL allow Admins to remove any published Thread that violates community guidelines.
3. THE Admin System SHALL allow Admins to respond to User Enquiries from a dedicated admin interface.
4. THE Admin System SHALL allow Admins to approve or reject Connection requests involving Minor accounts.
5. WHEN an Admin removes a Thread, THE Admin System SHALL send a notification to the Thread author stating that the Thread was removed.
6. THE Admin System SHALL provide a dashboard showing counts of: pending Threads, open Enquiries, and pending Minor connection requests.

---

### Requirement 11: Profile and Tags

**User Story:** As a User, I want to manage my profile and follow other Users, so that I can personalise my experience and stay connected with people I find interesting.

#### Acceptance Criteria

1. THE Profile Page SHALL display the User's name, city-level location, selected disciplines, participation role, and Tags.
2. THE Profile Page SHALL allow the User to edit their disciplines, Tags, participation role, and location at any time.
3. THE WISDOM Platform SHALL allow Users to follow other Users' profiles to receive updates on their activity.
4. THE WISDOM Platform SHALL NOT provide a direct messaging feature between Users; interaction SHALL be limited to Discussion Threads and Connection requests.
5. WHEN a User updates their Tags or disciplines, THE Recommendation System SHALL refresh the User's recommended Discussion Boards within 24 hours.

---

### Requirement 12: Sponsors

**User Story:** As a potential Sponsor, I want to submit a sponsorship request, so that my organisation can be featured on the WISDOM platform.

#### Acceptance Criteria

1. THE WISDOM Platform SHALL display a sponsorship enquiry link or button that directs potential Sponsors to a Google Form for submitting a sponsorship request.
2. THE Sponsor System SHALL use a Google Form URL provided and managed by the Admin; WHEN the Admin updates the Google Form URL in the platform settings, THE Sponsor System SHALL display the updated form without requiring a code deployment.
3. THE Home Page SHALL display a Sponsors section featuring advertisements from Sponsors whose requests have been approved by the Admin.
4. THE Admin System SHALL allow Admins to approve or reject sponsorship requests received via the Google Form and manage which Sponsors are displayed on the platform.
5. FOR the prototype, THE Sponsor System SHALL display a set of pre-seeded example Sponsor entries so that the Sponsors section is not empty before real Sponsors are onboarded; the pre-seeded entries SHALL include:
   - **NovaMind AI** — "Empowering the next generation of women in artificial intelligence and machine learning."
   - **Apex Engineering Group** — "Building a more inclusive future in civil and structural engineering."
   - **Meridian University Institute for STEM Equity** — "Advancing research and opportunity for women across all STEM disciplines."
   - **Women in STEM Foundation** — "A professional association dedicated to connecting, mentoring, and championing women in science and technology."
   - **Helix Biotech** — "Pioneering life sciences innovation with a commitment to diversity in research."
```
