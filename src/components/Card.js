import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewCard } from '../redux/cardSlice'
import './Card.css'

const cardData = {
  cardName: '',
  cardNumber: '',
  cardMonth: '',
  cardYear: '',
  ccv: '',
  bankName: '',
  cardStateActive: false,
}

const Card = () => {
  const navigate = useNavigate()
  const creditCard = useSelector((state) => state.cardInfo)
  const cardDefaultName = useSelector(
    (state) => state.cardInfo.cardInformation[0].cardName,
  )
  const dispatch = useDispatch()
  const [values, setValues] = useState(cardData)

  const cardInfoHandler = (e) => {
    const nextCard = {
      ...values,
      [e.target.name]: e.target.value,
    }
    setValues(nextCard)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (creditCard.cardInformation.length < 4) {
      dispatch(addNewCard(values))
      setValues(cardData)
    } else {
      alert('Du kan inte ha fler än 4 kort!')
    }
    navigate('/')
  }

  return (
    <>
      <div className="headline-wrapper">
        <h4 className="active--headline">Nytt kort</h4>
      </div>
      <div className="form--wrapper">
        <div className="credit--card">
          <div>{values.bankName}</div>

          <div className="card--number">{values.cardNumber}</div>
          <span className="card--ccv">{values.ccv}</span>
          <div className="card--info">
            <div className="info--name">
              <div className="card--label">KORTINNEHAVARENS NAMN</div>
              <div value={cardDefaultName.toLocaleUpperCase()}>
                {cardDefaultName.toLocaleUpperCase()}
              </div>
            </div>

            <div className="card--expiry">
              <div className="info--label">GILTIGT TILL</div>
              <div>
                {' '}
                {values.cardMonth} / {values.cardYear}
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="cardForm" onSubmit={handleSubmit}>
            <input
              readOnly
              type="text"
              name="cardName"
              placeholder={cardDefaultName}
              value={values.cardName || ''}
              onChange={cardInfoHandler}
            />

            <input
              type="text"
              minLength="16"
              maxLength="16"
              placeholder="Nummer"
              onChange={cardInfoHandler}
              name="cardNumber"
            />

            <div>
              <label> UTGÅNGSDATUM</label>
              <br></br>

              <input
                type="text"
                minLength="2"
                maxLength="2"
                placeholder="Månad"
                name="cardMonth"
                onChange={cardInfoHandler}
              />

              <input
                type="text"
                minLength="2"
                maxLength="2"
                placeholder="År"
                name="cardYear"
                onChange={cardInfoHandler}
              />
            </div>

            <input
              type="text"
              minLength="3"
              maxLength="3"
              placeholder="CCV"
              name="ccv"
              onChange={cardInfoHandler}
            />

            <select name="bankName" onChange={cardInfoHandler}>
              <option disabled selected value>
                {' '}
                Välj en bank{' '}
              </option>
              <option value="Mastercard"> MasterCard </option>
              <option value="Visa"> Visa </option>
              <option value="American Express"> American Express </option>
            </select>

            <button> Lägg till </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Card
