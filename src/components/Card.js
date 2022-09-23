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
  cardStateActive: null,
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
    <div className="form--wrapper">
      <div className="credit-card">
        <div className="credit-card__logo">{values.bankName}</div>

        <div className="credit-card__number">{values.cardNumber}</div>
        <span className="credit-ccv">{values.ccv}</span>
        <div className="credit-card__info">
          <div className="credit-card__info_name">
            <div className="credit-card__info_label">
              KORTINNEHAVARENS FÖR OCH EFTERNAMN
            </div>
            <div value={cardDefaultName.toLocaleUpperCase()}>
              {cardDefaultName.toLocaleUpperCase()}
            </div>
          </div>

          <div className="credit-card__info_expiry">
            <div className="credit-card__info_label">GILTIGT TILL</div>
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
  )
}

export default Card
