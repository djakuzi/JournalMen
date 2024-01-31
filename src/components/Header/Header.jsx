import SelectUSer from '../SelectUser/SelectUser';
import styles from './Header.module.css';

export default function Header({changedUser}) {

  const changeUser = (e) => {
     changedUser(e.target.value)
  }
  return (
    <>
      <img className={styles['logo']} src='..//..//../public/img/logo.png' alt='Логотип журнала'></img>
      <SelectUSer/>
    </>
  )
}