import React,{useState} from 'react'

const CardItem = (props) => {
    const { title, text, imageUrl, buttonText } = props;
    let cardTitle =props.title; // props is Readonly we an not change its value


    // const [title,setTitle]=useState(initialTitle);

    const clickHandler=()=>{
         cardTitle = "card 9"
         console.log(title);
        // setTitle("Card 9");
    }
    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="Card Image" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                {/* <p>{}</p> */}
                <button className="btn btn-primary" onClick={clickHandler} >{buttonText}</button>
            </div>
        </div>
    )
}

export default CardItem

