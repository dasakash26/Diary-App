import React from "react";

function Header(props) {
  return (
    <header>
      <h1>Diary</h1>
      <div className="bin" onClick={props.displayBin}>🗑️</div>
    </header>
  );
}

export default Header;
