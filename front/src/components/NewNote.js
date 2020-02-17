import React, { useState } from 'react';

export default function NewNote({ submit }) {
  const [content, setContent] = useState('');
  let onchange = e => setContent(e.target.value);

  return (
    <form
      onSubmit={e => {
        submit(e, content);
        setContent('');
      }}
    >
      <input type="text" onChange={onchange} value={content}></input>
      <button type="submit">save</button>
    </form>
  );
}
