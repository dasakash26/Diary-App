# Notes App

A comprehensive and user-friendly notes application developed using React. This app allows users to add, delete, and restore notes, with persistent storage through `localStorage`. The simple and intuitive UI enhances productivity by managing tasks and ideas efficiently.

## Features

1. **Add Notes**: Users can create new notes with a title and content. Each note is instantly displayed in reverse chronological order (most recent first).
2. **Delete Notes**: Notes can be moved to a bin (trash) instead of permanent deletion, providing an extra layer of data safety.
3. **Bin Management**: Items in the bin can be reviewed and restored back to the notes section at any time.
4. **Persistent Storage**: All notes and bin data are stored in the browser's `localStorage`, ensuring that the notes are preserved even after a page refresh or browser restart.

## Getting Started

## Project Structure

```plaintext
src/
 ├── components
 │    ├── Header.js      // Component for the app's header section
 │    ├── Footer.js      // Component for the app's footer section
 │    ├── Note.js        // Component to render individual notes
 │    ├── CreateArea.js  // Component to create new notes
 ├── App.js              // Main application component
 ├── index.js            // Application entry point
 └── styles.css          // Stylesheet for the application
```

## Application Overview

### Notes and Bin State Management

- **State Management**: React's `useState` is utilized to manage the application's main states:
  - `notes`: The array storing the current active notes.
  - `bin`: The array storing the deleted notes.
  - `binFlag`: A boolean flag used to toggle between displaying the main notes list and the contents of the bin.

- **Adding Notes**: Notes are added to the `notes` state and subsequently saved to `localStorage`. If the title and content of the note are both empty, the note is not saved.
  
- **Deleting Notes**: Instead of being permanently removed, deleted notes are moved to the bin and also stored in `localStorage`.

- **Restoring Notes**: Users can restore notes from the bin, moving them back to the active notes section.

### Local Storage Integration

The app leverages `localStorage` to ensure that notes and bin contents are retained even after a page reload or browser session restart. The `useEffect` hook is used to sync state changes with `localStorage`.

```js
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

useEffect(() => {
  localStorage.setItem("bin", JSON.stringify(bin));
}, [bin]);
```

Upon loading, the app checks for existing data in `localStorage` and initializes the state accordingly.

### Key Functions

- **Adding a New Note**:
  ```js
  const addNote = (newNote) => {
    if (newNote.title.trim() === "" && newNote.content.trim() === "") return;
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };
  ```

- **Restoring Notes from Bin**:
  ```js
  const restoreNote = (id) => {
    const restoredNote = bin[id];
    setNotes((prevNotes) => [restoredNote, ...prevNotes]);
    setBin((prevBin) => prevBin.filter((note, index) => index !== id));
  };
  ```

## Future Enhancements

- **Labels & Categories**: Add functionality for organizing notes into categories or applying labels.
- **Search Feature**: Implement a search functionality for quick retrieval of notes.
- **Enhanced UI/UX**: Introduce animations and a more refined design for a smoother user experience.

## Contributing

We welcome contributions! If you find bugs, have feature requests, or would like to improve the codebase, feel free to submit an issue or a pull request.

## License

This project is licensed under the MIT License. Please refer to the `LICENSE` file for more details.

---

Thank you for using the Notes App!