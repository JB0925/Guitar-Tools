import React, { useState } from "react";
import soundApi from "../soundApi";
import "../CSS/Guitarist.css";

const GuitaristInfo = () => {
    const initialState = {
        name: "",
        birthYear: "",
        deathYear: "",
        genre: "",
        biography: "",
        photo: ""
    };

    const [guitaristInfo, setGuitaristInfo] = useState(initialState);
    const [formData, setFormData] = useState("");
    const [badRequestError, setBadRequestError] = useState(false);

    const getGuitaristInfoFromApi = async(name) => {
        const response = await soundApi.getGuitaristInfo(name);
        if (typeof response === "string") {
            setBadRequestError(badRequestError => true);  
            setGuitaristInfo(guitaristInfo => initialState);
            return;
        };

        const { birthYear, deathYear, genre, biography, photo } = response;
        
        setBadRequestError(badRequestError => false);
        setGuitaristInfo(guitaristInfo => ({
            ...guitaristInfo,
            name,
            birthYear,
            deathYear,
            genre,
            biography,
            photo
        }));
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => value);
    };

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        await getGuitaristInfoFromApi(formData);
        setFormData(formData => "");
    };

    const setPhotoOrPlaceHolder = () => {
        if (!photo) return null;
        return <img src={photo} alt={name} />
    };

    const formatParagraphs = text => {
        return text.split("\n").map(pg => <p>{pg}</p>);
    };

    const { name, birthYear, deathYear, genre, biography, photo } = guitaristInfo;
    console.log(biography.split("\n").join("\n"));
    return (
        <div className="Guitarist">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter a Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter a Name"
                    value={formData}
                    required
                />
                <button className="searchButton">Submit</button>
            </form>
            {badRequestError ?
            <h1>Sorry, we could not find any results for that guitarist...</h1>
            :
            <div className="GuitaristInfo">
                <div className="info">
                    <h2>Name: {name}</h2>
                    <p>Birth Year: {birthYear}</p>
                    <p>Death Year: {deathYear}</p>
                    <p>Genre: {genre}</p>
                    <p>Biography: {formatParagraphs(biography)}</p>
                </div>
                <div className="artistPhoto">
                    {setPhotoOrPlaceHolder()}
                </div>
            </div>}
        </div>
    );
};

export default GuitaristInfo;