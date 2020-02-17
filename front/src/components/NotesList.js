import React from 'react';
import Note from './Note';
export default function NotesList({ notes, update, filter }) {
  const filteredList = notes.filter(el => el.important);
  return (
    <ul>
      {filter
        ? filteredList.map(el => (
            <Note note={el} key={el.id} update={update}></Note>
          ))
        : notes.map(el => <Note note={el} key={el.id} update={update}></Note>)}
    </ul>
  );
}
