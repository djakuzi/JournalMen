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
  const [selectedItem, setSelectedItem] = useState({})

  const addItem = function(item){
    if(!item.id){
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date), 
        id: Math.max( ...items.map( i => i.id), 0) + 1,
      }])
    } else {
      setItems( [...mapItems(items).map( el =>{
        return (el.id == item.id) ? {...item, date: new Date(item.date)} : el 
      })])
    }
    
  }
  const deleteItem = (id) => {
    setItems(items.filter( el => el.id !== id))
    setSelectedItem({})
  }

  return (
    <UserContextProvider>
      <div className='app'>

      <LeftPanel>
        <Header/>

        <JournalAddButton clearForm={() => setSelectedItem({})}/>
        <JournalList items = {mapItems(items)} setItem={setSelectedItem}>

        </JournalList>

      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} onDelete={deleteItem} selectedItem ={selectedItem} />
      </Body>

      </div>
    </UserContextProvider>
  )
}
