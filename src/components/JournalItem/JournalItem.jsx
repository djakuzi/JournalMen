import './JournalItem.css';


export default  function JournalItem({data}) {

  const formatedDate = new Intl.DateTimeFormat('ru-RU').format(data.date);
  return (
    <>
      <h2 className="journal-item__header">{data.title}</h2>
       <h2 className="journal-item__body">
        <div className="journal-item__date">{formatedDate}</div>
        <div className="journal-item__text">{data.text}</div>
       </h2>
    </>
  )
}

