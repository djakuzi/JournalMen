import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

export default  function JournalList({items}) {

  const {userId} = useContext(UserContext)

  if (items.length === 0){

    return <div className='journal-list'>
      <p>Записей нет</p>
    </div>
  }

 const sortItems = (a,b) =>{
    if(a.date < b.date){
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className='journal-list'>
      {items.filter( el => (userId === el.userId)).sort(sortItems).map( el => (
          <CardButton key={el.id}>
            <JournalItem data = {el}/>
          </CardButton>
        ))}
    </div>
  )
}