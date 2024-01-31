import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

export default  function JournalList({items}) {

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
      {items.sort(sortItems).map( el => (
          <CardButton key={el.id}>
            <JournalItem data = {el}/>
          </CardButton>
        ))}
    </div>
  )
}