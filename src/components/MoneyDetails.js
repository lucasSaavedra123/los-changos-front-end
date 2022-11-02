import "../assets/scss/moneyDetails.scss"

export const MoneyDetails = (props) => {
  
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className="money-details-container">
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-img"
        />
        {//Agregar div para ajustar texto con el box 
        }
        <div>
          <p className="details-text">Tus gastos</p>
          <p className="details-money" testid="expensesAmount">
            $ {addCommas(props.total)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails