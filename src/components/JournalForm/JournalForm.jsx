import styles from './JournalForm.module.css';
import {useEffect, useReducer, useState, useRef, useContext} from 'react'
import Button from '../Button/Button';
import cn from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

export default  function JournalForm({onSubmit, selectedItem, onDelete}) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const {isValid, isFormReadyToSubmit, values} = formState 
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const {userId} = useContext(UserContext)

  const focusError = (isValid) => {
    switch(true){
      case !isValid.title:
        titleRef.current.focus()
        // titleRef.current.focus()
        break
      case !isValid.title:
      dateRef.current.focus()
      break
      case !isValid.title:
      textRef.current.focus()
      break
    }
  }

  useEffect( ()=>{
    if(selectedItem){
      dispatchForm({type: 'CLEAR'})
      dispatchForm({type: 'SET_VALUE', payload: {userId}})
    }

    dispatchForm({type: 'SET_VALUE', payload: {...selectedItem}})
  },[selectedItem])
  
  useEffect( () =>{

    let timerId 

    if(!isValid.date || !isValid.text || !isValid.title){
      focusError(isValid)
      timerId = setTimeout( () => {
        dispatchForm({type: 'RESET_VALIDITY'})
      }, 1000)
    }

    return () => {
      clearTimeout(timerId)
    }

  }, [isValid])

  useEffect( () => {
    if(isFormReadyToSubmit){
      onSubmit(values)
      dispatchForm({type: 'CLEAR'})
      dispatchForm({type: 'SET_VALUE', payload: {userId}})
    }
  }, [isFormReadyToSubmit, values, onSubmit,selectedItem])

  useEffect( () => {
    dispatchForm({type: 'SET_VALUE', payload: {userId}})
  }, [userId])

  const onChange = function(e){
    dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}})
  }

  const addJournalItem = function(event){

    event.preventDefault()
    dispatchForm({type: 'SUBMIT'})
  }

  const onDeleteItem = (id) => {
    onDelete(id)
    dispatchForm({type: 'CLEAR'})
    dispatchForm({type: 'SET_VALUE', payload: {userId}})
  }

  return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
          <div className={styles['flexInputButton']}>
            <Input type='text' isValid = {isValid.title}  onChange={onChange} ref={titleRef} value={values.title} name='title' appearence='title' placeholder='Заголовок' />
            {selectedItem.id && <button className={styles['delete']} type='button' onClick={ () => onDeleteItem(selectedItem.id)}>
              <img src='./img/archive.png' alt='кнопка удалить'></img>
            </button>}
          </div>

          <div className={styles['form-row']}>

            <label htmlFor='date' className={styles['form-label']}>
              <img src="..//..//../public/img/calendar.png" alt="" />
              <span>Дата</span>
            </label>

            <Input type='date' isValid = {isValid.date} onChange={onChange} ref={dateRef} value={values.date ? new Date(values.date).toISOString().slice(0,10) : ''} name='date' id='date' appearence='date'/>

          </div>

          <div className={styles['form-row']}>

            <label htmlFor='tag' className={styles['form-label']}>
              <img src="..//..//../public/img/tag.png" alt="Иконка папки" />
              <span>Метки</span>
            </label>

            <Input type='text' onChange={onChange} value={values.tag} name='tag' id='tag' ></Input>
            
          </div>

          <textarea name="text" onChange={onChange} ref={textRef} value={values.text} id="" cols="30" rows="20" className={cn(styles['input'], {
            [styles['invalid']]: !isValid.text
          })}>

          </textarea>

          <Button text='Сохранить'/>
       </form>
  )    
}