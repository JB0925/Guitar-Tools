import { useState } from "react";
import soundApi from "../soundApi";
import { v4 as uuid } from "uuid";

const useGetGuitaristData = () => {
    const ERROR_MESSAGE = "Sorry, we could not find this musician.";

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

    const resetGuitaristState = () => {
        setGuitaristInfo(guitaristInfo => initialState);
    };

    const resetBadRequestErrorToFalse = () => {
        setBadRequestError(badRequestError => false);
    };

    const updateGuitaristStateWithNewData = (name, { birthYear, deathYear, genre, biography, photo }) => {
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

    const getGuitaristInfoFromApi = async(name) => {
        const response = await soundApi.getGuitaristInfo(name);
        if (response === ERROR_MESSAGE) {
            setBadRequestError(badRequestError => true);  
            resetGuitaristState();
            return;
        };
        
        resetBadRequestErrorToFalse();
        updateGuitaristStateWithNewData(name, response);
    };

    const titleCaseName = name => {
        return name.split(" ")
        .map(nm => `${nm[0].toUpperCase()}${nm.slice(1)}`)
        .join(" ");
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
        return text.split("\n").filter(pg => pg !== "")
        .map(pg => <p key={uuid()}>{pg}</p>)
    };

    const formatGuitaristInfo = () => {
        if (!name) return null;
        return (
            <>
                <div className="Guitarist-info">
                    <h2>Name: {titleCaseName(name)}</h2>
                    <h3><b>Birth Year:</b> {birthYear}</h3>
                    <h3><b>Death Year:</b> {deathYear}</h3>
                    <h3><b>Genre:</b> {genre}</h3>
                </div>
                <div className="Guitarist-photo">
                    {setPhotoOrPlaceHolder()}
                </div>
            </>
        );
    };

    const { name, birthYear, deathYear, genre, biography, photo } = guitaristInfo;

    return [
            handleSubmit, handleChange, 
            formData, badRequestError, 
            biography, formatGuitaristInfo, 
            formatParagraphs
        ];
};

export default useGetGuitaristData;