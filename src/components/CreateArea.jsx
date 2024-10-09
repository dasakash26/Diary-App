import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      props.addNote(note);
      setNote({
        title: "",
        content: "",
      });
    }
  };

  return (
    <div>
      <form onKeyDown={handleKeyDown}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />
        <button
          type="button"
          onClick={(event) => {
            props.addNote(note);
            setNote({
              title: "",
              content: "",
            });
            event.preventDefault();
          }}
        >
          +
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
