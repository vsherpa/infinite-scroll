import {Todo} from "../types/Todo.ts";
import React, {FC} from "react";


interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  todo: Todo;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const TodoCard: FC<TodoCardProps> = ({todo, innerRef, ...props}) => {
  return (
      <div>
        <p className='todo-card' key={todo.id} ref={innerRef} {...props}>
          {todo.id + ': ' } {todo.title} {todo.completed ? '✅' : '❌'}
        </p>
      </div>
  );
}

export default TodoCard;