import React, { useState } from 'react';
export default function Note({ note, update }) {
  const { content, important, id } = note;
  const [importance, changeImportance] = useState(important);
  let onclick = () => {
    update(id);
    changeImportance(!importance);
  };
  return (
    <li>
      <p>{content}</p>
      <button onClick={onclick}>
        {importance ? 'unset important' : 'set important'}
      </button>
    </li>
  );
}
