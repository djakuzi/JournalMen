import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';
// import style from 'styled-components'


export default  function JournalAddButton() {

  // const Plus = style.img`
  //   width: 20px
  // `

  return (
    <CardButton className="journal-add">
      <img className='plus' src='..//..//../public/img/plus.png'></img>
        Новая запись
    </CardButton>
  )
}