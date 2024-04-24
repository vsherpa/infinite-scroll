import {ColumnDef} from "@tanstack/react-table";
import {Todo} from "../../types/Todo.ts";


/* create a react-table column definition for Todos */
export const todoColumnDef: ColumnDef<Todo>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Completed',
    accessorKey: 'completed',
  },
];