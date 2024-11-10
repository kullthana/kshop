import React, { useEffect } from 'react'
import NotebookLists from '../components/NotebookListsPageComponent/NotebookLists'
import { useDispatch } from 'react-redux'
import { fetchData } from '../actions/NotebookListsAction'
const NotebookListsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <div>
      <NotebookLists />
    </div>
  )
}

export default NotebookListsPage
