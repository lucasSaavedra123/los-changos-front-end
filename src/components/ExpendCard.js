import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from 'material-ui/List/ListItem';
import "../assets/scss/expenseCard.scss"
import LunchDiningIcon from '@mui/icons-material/LunchDining';

export const ExpendCard = (props) => {

    return(

        <div className='card-container'>
        <div className="card-wrapper">
            <div className="left-side">
                <div className="logo">
                    <LunchDiningIcon/>
                </div>
                <div className="expense-title" >{props.title}</div>
            </div>
            <div className="right-side">
                
                <div className="expense-value">${props.value}</div>
            </div>
        </div>
        </div>

    )



}
export default ExpendCard;