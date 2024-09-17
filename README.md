# Videos App

## Description

This is a React application that allows you to list, add, edit, and delete videos. It uses Material-UI for visual components and connects to an API to manage video data.

## Requirements

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

## API Configuration

1. **Location of the configuration file:**

   The API configuration file is located at `src/config.json`.

2. **Content of the `config.json` file:**

   Make sure the `config.json` file has the following structure with your API URL:

   ```json
   {
     "apiUrl": "http://localhost:8000/api"
   }
   ```

   - **`apiUrl`**: The base URL for your API.

## Running the Application

1. **Start the application:**

   ```bash
   npm start
   ```

   This will start the development server and the application will be available at `http://localhost:3000`.

## Usage

1. **Video List Page:**

   - You can view the list of videos with their IDs, names, and edit/delete actions.
   - Clicking the edit button will open a modal to edit the video details.
   - Clicking the delete button will show a confirmation modal. If confirmed, the video will be removed from the database.

2. **Watch Videos Page:**

   - You can view the list of videos and clicking on a video will open it on YouTube.

3. **Add a New Video:**

   - On the video list page, there is a button to add a new video.
   - Clicking the button will open a modal to enter the details of the new video.
   - You can either cancel the process or save the video.

## Project Structure

- `src/`
  - `api/`: Functions to interact with the API.
  - `components/`: Reusable components such as modals.
  - `pages/`: Components for the main pages.
  - `redux/`: Redux configuration and slices.
  - `config.json`: API configuration file.
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure all tests pass.
4. Submit a pull request describing your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
