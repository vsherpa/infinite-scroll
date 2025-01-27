import './App.css'
import {useInfiniteQuery} from '@tanstack/react-query';
import {useInView} from 'react-intersection-observer';
import {useEffect} from 'react';
import IndexPage from './components/table/IndexPage.tsx';


function App() {
    const {ref, inView} = useInView();


    const fetchTodos = async ({pageParam}: { pageParam: number }) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
        return await response.json()
    }
    const {data, status, error, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log({lastPage, allPages});
            const nextPage = lastPage.length ? allPages.length : undefined;
            return nextPage;
        }
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            console.log('fire!');
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage])


    if (status === 'pending') return <div>Loading...</div>

    if (status === 'error') return <div>Error: {error.message}</div>
    return (<IndexPage/>)

}

export default App
