import React from "react";

function Header(props) {
  return (
    <header>
      <h1>Diary</h1>
      <div className="bin" onClick={props.displayBin}>
        {!props.status ? "🗑️" : "🏠"}
      </div>
    </header>
  );
}

export default Header;

