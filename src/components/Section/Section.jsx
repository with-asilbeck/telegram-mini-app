import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import {db} from "../../firebaseConfig";
import { getDocs, doc, collection } from "firebase/firestore";

const Section = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #090d15;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    min-height: 85vh;
    width: 98.5%;
    border: 1px solid black;
    border-radius: 8px;
    margin: 10px;
    `

    const Button = styled('button')`
    display: flex;
    background-color: red;
    color: black;
    width: 6rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    &:hover {
        transition: 0.5s;
        background-color: yellow;
    }
    `



const SectionContainer = () => {
    const { movies, setMovies } = useState([]);
    const moviePlatform = collection(db, "movie-platform-backend")

    useEffect(() => {
        const getInfo = async() => {
            const data = await getDocs(moviePlatform)
            // setMovies(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
            console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }

        getInfo()
    }, [])

    return(
        <Section>Section
            <Button>Click</Button>
        </Section>
    )
}

export default SectionContainer;