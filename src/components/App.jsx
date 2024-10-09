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

  const clearBin = () => {
    if (window.confirm("Are you sure you want to clear the bin?")) {
      setBin([]);
    }
  };

  return (
    <div>
      <Header displayBin={displayBin} status={binFlag} />
      {binFlag ? (
        <div className="bin-view">
          <div className="bin-message">
            <h2>{bin.length} items in bin...</h2>
            <button className="clear-bin-button" onClick={clearBin}>
              Clear Bin
            </button>
          </div>
          <div className="bin-notes">
            {bin.map((note, index) => (
              <Note
                key={index}
                id={index}
                note={note}
                deleteNote={restoreNote}
              />
            ))}
          </div>
        </div>
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
