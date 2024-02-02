import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';
// import style from 'styled-components'


export default  function JournalAddButton({clearForm}) {

  // const Plus = style.img`
  //   width: 20px
  // `

  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <img className='plus' src='..//..//../public/img/plus.png'></img>
        Новая запись
    </CardButton>
  )
}