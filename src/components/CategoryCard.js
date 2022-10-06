import "../assets/scss/expenseCard.scss"
import CategoryIcon from './CategoryIcon';


export const CategoryCard = (props) => {

    console.log(props.material_ui_icon_name)
    console.log(props.name)

    return (

        <div className="card-wrapper">
            <div className="left-side">
                <div className="logo">
                    <CategoryIcon name={props.material_ui_icon_name} />
                </div>
                <div className="expense-title" >{props.name}</div>
            </div>
        </div>

    )



}
export default CategoryCard;