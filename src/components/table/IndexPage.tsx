import {flexRender, getCoreRowModel, getPaginationRowModel, useReactTable,} from '@tanstack/react-table';
import {useEffect, useState} from 'react';
import {Todo} from "../../types/Todo.ts";
import {todoColumnDef} from "./todoColumnDef.tsx";

const IndexPage = () => {

  const [data, setData] = useState<Todo[]>([]);


  useEffect(() => {
    (async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setData(data);
    })();
    return () => {
      console.log('unmounting');
    };

  }, []);

  const tableInstance = useReactTable({
    data,
    columns: todoColumnDef,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-5">
        <table>
          <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                        <th colSpan={header.colSpan} key={header.id}
                            className="p-2 border-2 border-violet-300 text-violet-700 hover:bg-violet-200 transition-colors duration-200">
                          {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                        </th>
                    );
                  })}
                </tr>
            );
          })}
          </thead>
          <tbody>
          {tableInstance.getRowModel().rows.map((row) => {
            return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                        <td key={cell.id} className="border-2 p-2">
                          {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                          )}
                        </td>
                    );
                  })}
                </tr>
            );
          })}
          </tbody>
        </table>
        <div className="mt-5 flex flex-row border-2 gap-5 p-5">
          <button onClick={() => tableInstance.setPageIndex(0)} disabled={!tableInstance.getCanPreviousPage()}>First
            Page
          </button>
          <button onClick={() => tableInstance.previousPage()} disabled={!tableInstance.getCanPreviousPage()}>Previous
            Page
          </button>
          <button onClick={() => tableInstance.nextPage()} disabled={!tableInstance.getCanNextPage()}> Next Page
          </button>
          <button onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}>Last Page</button>
        </div>
      </main>
  )
      ;
};

export default IndexPage;