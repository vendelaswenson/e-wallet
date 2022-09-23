import { useSelector, useDispatch } from 'react-redux'
import { deleteCard, toggleActive } from '../redux/cardSlice'
import './Cards.css'

const Ewallet = () => {
  const creditCard = useSelector((state) => state.cardInfo.cardInformation)

  const defaultCardName = useSelector(
    (state) => state.cardInfo.cardInformation[0].cardName,
  )

  const dispatch = useDispatch()

  const toggleActiveHandler = (index) => {
    dispatch(toggleActive(index))
  }

  const deleteHandler = (index) => {
    console.log(creditCard[index], creditCard[index].cardStateActive)
    if (creditCard.length > 1) {
      if (creditCard[index].cardStateActive === null) {
        dispatch(deleteCard(index))
      } else {
        alert('Du kan inte ta bort ett aktivt kort!')
      }
    } else {
      alert('Du måste ha minst ett kort!')
    }
  }

  return (
    <div className="cards--wrapper">
      <h1 className="header--ewallet">E-wallet</h1>
      <h4 className="active--headline">Aktivt kort</h4>
      <ul className="li-wrapper">
        {creditCard.map((credit, index) => {
          return (
            <li
              key={index}
              className={
                credit.cardStateActive ? 'card-li active' : 'card-li inactive'
              }
            >
              <div
                className={
                  credit.cardStateActive ? 'credit-card-active' : 'credit-card'
                }
                onClick={() => {
                  toggleActiveHandler(index)
                }}
              >
                <div className="credit-card__logo">{credit.bankName}</div>

                <div className="credit-card__number">{credit.cardNumber}</div>
                <span className="credit-ccv">{credit.ccv}</span>
                <div className="credit-card__info">
                  <div className="credit-card__info_name">
                    <div className="credit-card__info_label">
                      KORTINNEHAVARENS NAMN
                    </div>
                    <div value={defaultCardName}>
                      {defaultCardName.toLocaleUpperCase()}
                    </div>
                  </div>

                  <div className="credit-card__info_expiry">
                    <div className="credit-card__info_label">GILTIGT TILL</div>
                    <div>
                      {' '}
                      {credit.cardMonth} / {credit.cardYear}
                    </div>
                  </div>
                </div>
              </div>
              <button className="delBtn" onClick={() => deleteHandler(index)}>
                {' '}
                Ta bort kort
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Ewallet
