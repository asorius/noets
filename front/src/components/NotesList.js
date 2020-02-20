import React from 'react';
import Note from './Note';
export default function NotesList({ notes, update, filter, ondelete }) {
  const filteredList = notes.filter(el => el.important);
  return (
    <ul>
      {filter
        ? filteredList.map(el => (
            <Note note={el} key={el.id} update={update}></Note>
          ))
        : notes.map(el => (
            <Note
              note={el}
              key={el.id}
              update={update}
              ondelete={ondelete}
            ></Note>
          ))}
    </ul>
  );
}
