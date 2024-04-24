import './App.css'
import TodoCard from "./components/TodoCard.tsx";
import {Todo} from "./types/Todo.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import IndexPage from "./components/table/IndexPage.tsx";


function App() {
  const {ref, inView} = useInView();


  const fetchTodos = async ({pageParam}: { pageParam: number }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
    return await response.json()
  }
  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log({lastPage, allPages});
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    }
  })

  const content = data?.pages.map((todos: Todo[]) =>
      todos.map((todo: Todo, index) => {
        if(todos.length === index + 1) {
          return <TodoCard key={todo.id} innerRef={ref} todo={todo}/>
        }
        return <TodoCard key={todo.id} todo={todo}/>
      })
  );

  useEffect(() => {
    if(inView && hasNextPage) {
      console.log('fire!');
      fetchNextPage();
    }
  },[inView, hasNextPage, fetchNextPage])


  if (status === 'pending') return <div>Loading...</div>

  if (status === 'error') return <div>Error: {error.message}</div>
/*  return (
      <div className='app'>
        {content}
{/!*        <button
            ref={ref}
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'No more to load'}</button>*!/}

        {isFetchingNextPage && <h3>Loading</h3>}
      </div>
  )*/
  return (<IndexPage/>)

}

export default App
