import React, { useEffect, useState, useReducer } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer = (prevState, action)=>{
	if (action.type ==='USER_INPUT') {
		return {
			value:action.val,
			isValid: action.val.includes('@'),
		}
		
	}
	if (action.type ==='INPUT_BLUR') {
		return{
			value:prevState.value,
			isValid: prevState.value.includes('@')
		}
	}
	return{
		value:'',
		isValid: false,
	}

}


const passwordReducer = (prevState, action)=>{
	if (action.type ==='USER_INPUT') {
		return {
			value:action.val,
			isValid: action.val.trim().length > 6,
		}
		
	}
	if (action.type === 'INPUT_BLUR') {
		return{
			value:prevState.value,
			isValid: prevState.value.trim().length > 6,
		}
	}
	return{
		value:'',
		isValid: false,
	}

}

const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value :'',
		isValid :false,
	})
	const [passwordState, dispatchPassWord] =useReducer(passwordReducer, {
		value :'',
		isValid :false,
	})

	// const [enteredEmail, setEnteredEmail] = useState('')// внутри пишем свой email
	// const [emailIsValid, setEmailIsValid] = useState(false)// проверяем email
	// const [enteredPassword, setEnteredPassword] = useState('')//пароль вводим 
	// const [passwordIsValid, setPasswordIsValid] = useState()// проверяем пароль
	const [formIsValid, setFormIsValid] = useState(false)//проверяет форму валидная или нет, если пустая тогда false

	useEffect(() => {
   const identifier = setTimeout(()=>{
    console.log('Valid');
      setFormIsValid(  emailState.isValid && passwordState.isValid)
		
      

    }, 2500);

    return()=>{
      console.log('Clean app');
      clearTimeout(identifier)
    }//useEffect вызывает функцию из предыдущего выполнения побочного эффекта, чтобы очистить. Затем запускает текущий side effect
  
	
	}, [emailState.isValid, passwordState.isValid])

	const emailChangeHandler = (event) => {
		//это функция вызывется внутри инпутов c помощи onChange
		// setEnteredEmail(event.target.value)
		// В инпуте пишем onChange и вызываем эту функцию,берем их значение и внутри мы вызываем setEnteredEmail, значение сохраняются в enteredEmail
		dispatchEmail({
			type:'USER_INPUT', val:event.target.value
		});
		// setFormIsValid(
		// 	event.target.value.includes('@') && enteredPassword.trim().length > 6
		// );//если value которое мы пишем, включает @ а пароль больше 6, то true
	}

	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value)
		dispatchPassWord({type: 'USER_INPUT', val: event.target.value})
		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	}// то же самое но тут вызываем passwordChangeHandler и внутри setEnteredPassword в enteredPassword сохраняются пароли

	const validateEmailHandler = () => {
		// setEmailIsValid(enteredEmail.includes('@'))
		dispatchEmail({type:'INPUT_BLUR'})
	}// тут проверяем есть ли там '@' если есть то идет дальше если нет то 

	const validatePasswordHandler = () => {
		dispatchPassWord({type:'INPUT_BLUR'})
		// setPasswordIsValid(enteredPassword.trim().length > 6)//тут проверяют пароль если больше 6 то true если нет то false  
	}

	const submitHandler = (event) => {
		//когда все true вызываем функцию submitHandler
		event.preventDefault()
		props.onLogin(emailState.value, passwordState.value)
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}//берет класс control, но когда emailIsValid равен fasle, то срабатывает класс invalid
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}//это событие берет true или false. срабатывает когда мы правильно выполнили условие. ( меняет стили)
						//Каждый раз, когда вы выходите из поля ввода, событие срабатывает.Неважно, изменилось значение или нет, каждый раз вы выходите из фокуса. Событие сработает.
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}	//берет класс control, но когда passwordIsValid равен fasle, то срабатывает класс invalid.


					
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}	//Я хочу, чтобы кнопка была отключена, когда входное значение пусто. 
						// и тут мы использовали disabled. Cработает после правильного ввода и после заполнение поля. Т.е если этого не произойдет, то кнопка отвечать не будет
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
