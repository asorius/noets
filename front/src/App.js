import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import NewNote from './components/NewNote';
import actions from './actions';

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    actions.getAllNotes().then(data => setNotes(data));
  }, []);

  const submit = (e, content) => {
    e.preventDefault();
    actions.addNote(content).then(data => setNotes([...notes, data]));
  };
  const updateImportance = id => {
    actions
      .setImportance(id)
      .then(data => setNotes(notes.map(el => (el.id === data.id ? data : el))));
  };
  const filterImportance = () => {
    setFilter(!filter);
  };
  const ondelete = id => {
    actions.deleteNote(id);
    setNotes(notes.filter(note => note.id !== id));
    console.log(id);
  };
  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={filterImportance}>
        {filter ? 'show all' : 'show important only'}
      </button>
      <NotesList
        notes={notes}
        update={updateImportance}
        filter={filter}
        ondelete={ondelete}
      ></NotesList>
      <NewNote submit={submit}></NewNote>
    </div>
  );
}

export default App;
