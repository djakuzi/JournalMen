import {useContext} from 'react'
import { UserContext } from '../../context/user.context';


export default function SelectUSer({changedUser}) {
    const {userId, setUserId} = useContext(UserContext)

  const changeUser = (e) => {
     setUserId(+e.target.value)
  }

  return (
    <>
      <select name="user" id="user" value={userId }onChange={changeUser}> 
        <option value="1">Антон</option>
        <option value="2">Вася</option>
      </select>
    </>
  )
}