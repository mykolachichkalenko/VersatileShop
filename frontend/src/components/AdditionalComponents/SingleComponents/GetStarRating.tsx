import "./GetStarRating.css";
import React from "react";

interface GetStarRatingProps {
    setRatingStars: React.Dispatch<React.SetStateAction<number>>;
}
export function GetStarRating({setRatingStars}: GetStarRatingProps) {

    const setRating = (rating :number ) =>{
        setRatingStars(rating);
    }

    return (
        <div className="rating">
            <input type="radio" id="star5" name="rating" value="5" onChange={() =>setRating(5)}/>
            <label htmlFor="star5"></label>
            <input type="radio" id="star4" name="rating" value="4" onChange={() =>setRating(4)}/>
            <label htmlFor="star4"></label>
            <input type="radio" id="star3" name="rating" value="3" onChange={() =>setRating(3)}/>
            <label htmlFor="star3"></label>
            <input type="radio" id="star2" name="rating" value="2" onChange={() =>setRating(2)}/>
            <label htmlFor="star2"></label>
            <input type="radio" id="star1" name="rating" value="1" onChange={() =>setRating(1)}/>
            <label htmlFor="star1"></label>
        </div>

    );
}
