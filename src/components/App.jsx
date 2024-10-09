import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [bin, setBin] = useState(() => {
    const savedBin = localStorage.getItem("bin");
    return savedBin ? JSON.parse(savedBin) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("bin", JSON.stringify(bin));
  }, [bin]);

  const [binFlag, setBinFlag] = useState(false);

  const addNote = (newNote) => {
    if (newNote.title.trim() === "" && newNote.content.trim() === "") return;
    setNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  };

  const deleteNote = (id) => {
    setBin((prevBin) => [notes[id], ...prevBin]);
    setNotes((prevNotes) => prevNotes.filter((note, index) => id != index));
  };

  const displayBin = () => {
    setBinFlag((prevFlag) => !prevFlag);
  };

  const restoreNote = (id) => {
    const restoredNote = bin[id];
    setNotes((prevNotes) => [restoredNote, ...prevNotes]);
    setBin((prevBin) => prevBin.filter((note, index) => index !== id));
  };

  return (
    <div>
      <Header displayBin={displayBin} />
      {binFlag ? (
        <>
          <h2> {bin.length} items in bin...</h2>
          {bin.map((note, index) => (
            <Note key={index} id={index} note={note} deleteNote={restoreNote} />
          ))}
        </>
      ) : (
        <>
          <CreateArea addNote={addNote} />
          {notes.map((note, index) => (
            <Note key={index} id={index} note={note} deleteNote={deleteNote} />
          ))}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
