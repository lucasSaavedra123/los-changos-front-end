import MoneyDetails from "./MoneyDetails";
import "../assets/scss/moneyManager.scss"

export const MoneyManager = () => {


    return(
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">¡Bienvenido a Walletify Gonzalo Paredes !</h1>
          </div>
          <MoneyDetails/>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {/* {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))} */}
                </ul>
              </div>
            
          </div>
        </div>
      </div>
    )
}

export default MoneyManager;