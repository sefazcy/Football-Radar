# Football Radar App

This project is a web application developed using React that fetches data from TheSportsDB API to display football team details and match results.

## Features
- **Team Search**: Search for any football team.
- **Team Details**: View team logo, description, and establishment year.
- **Match Results**: List the scores of the last 5 matches.
- **Dynamic Styling**: Color-coded badges for Win (Green), Loss (Red), and Draw (Gray).
- **League Overview**: View this week's results for major leagues.
- **Responsive Design**: Optimized for mobile and desktop with a dark mode interface.

## Technologies Used
- React
- Vite
- Axios
- CSS3 (Variables, Flexbox, Grid)
- TheSportsDB API

## API Information
This project uses **TheSportsDB API**: [https://www.thesportsdb.com/](https://www.thesportsdb.com/)
Key endpoints used:
- `/searchteams.php?t={TeamName}`
- `/eventslast.php?id={TeamID}`
- `/eventsround.php?id={LeagueID}&r={Round}&s={Season}`

## Installation and Setup

To run this project, you need **Node.js** installed on your system.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sefazcy/Football-Radar.git
   cd Football-Radar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

## Screenshot
![App Screenshot](https://via.placeholder.com/800x450?text=App+Screenshot+Placeholder)
*(Please replace this placeholder with an actual screenshot of the application)*

## License
This project is for educational purposes as part of the Web Programming course final assignment.
