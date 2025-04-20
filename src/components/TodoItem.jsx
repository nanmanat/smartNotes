import React, { useState } from 'react';

function TodoItem({ text }) {
  const [completed, setCompleted] = useState(false);
  
  return (
    <div className="flex items-center py-2">
      <input 
        type="checkbox" 
        checked={completed}
        onChange={() => setCompleted(!completed)}
        className="mr-3 h-5 w-5"
      />
      <span className={completed ? "line-through text-gray-400" : ""}>
        {text}
      </span>
    </div>
  );
}

export default TodoItem;