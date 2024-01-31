import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/use-localstorage.hook'
import { UserContext, UserContextProvider } from './context/user.context'
import { useState } from 'react'

function mapItems(items){

  if (!items){
    return []
  }

  return items.map(i =>({
      ...i,
      date: new Date(i.date)
    }))
  }

export default  function App() {

  const [items, setItems] = useLocalStorage('data')
 

  const addItem = function(item){
    setItems([...mapItems(items), {
      ...item,
      date: new Date(item.date), 
      id: Math.max( ...items.map( i => i.id), 0) + 1,
    }])
    
  }
  
  return (
    <UserContextProvider>
      <div className='app'>

      <LeftPanel>
        <Header/>

        <JournalAddButton />
        <JournalList items = {mapItems(items)}>

        </JournalList>

      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>

      </div>
    </UserContextProvider>
  )
}

// [{
//       "id": 1,
//       "title": "Подготовка к обновлению курсов",
//       "text": "Горные походы открывают удивительные природные ландшафт",
//       "date": "2024/03/03"
//     },

//     {
//       "id": 2,
//       "title": "Поход в годы",
//       "text": "Думал, что очень много времени",
//       "date": "2023/03/03"
//     }
//   ]