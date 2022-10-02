import "../assets/scss/moneyDetails.scss"

export const MoneyDetails = () => {

  return (
    <div className="money-details-container">
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-img"
        />
        <div>
          <p className="details-text">Tus gastos</p>
          <p className="details-money" testid="expensesAmount">
            Rs {0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails