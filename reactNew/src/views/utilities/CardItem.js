import React,{useState} from 'react'

const CardItem = (props) => {
    const { title:initialTitle, text, imageUrl, buttonText } = props;


    const [title,setTitle]=useState(initialTitle);

    const clickHandler=()=>{
         setTitle("Card 9");
    }
    return (
        <div className="card">
        <img src={`${imageUrl}`} className="card-img-top" alt="Card with landscape view and mountains" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <button className="btn btn-primary" onClick={clickHandler} >{buttonText}</button>
            </div>
        </div>
    )
}

export default CardItem

