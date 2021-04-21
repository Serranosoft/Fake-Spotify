/* import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import banner from "../images/banner.png"
import { FirebaseContext } from './Firebase';

function RecoverPassword({ closeModal }) {

    const initialState = {
        emailInput: ""
    }

    const [inputValues, setInputValues] = useState(initialState)
    const { resetPassword } = useContext(FirebaseContext);

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }

    const onSubmit = event => {

        resetPassword(inputValues.emailInput)
            .then(authUser => {
                setInputValues(inputValues)
                closeModal();
            })
            .catch(error => {
                console.log(error);
            });

        event.preventDefault();
    }


    return (
        <ModalContainer>
            <CloseModal onClick={closeModal}>&times;</CloseModal>
            <HomeBanner>
                <Banner src={banner} />
            </HomeBanner>
            <h1 style={{ marginBottom: "16px", fontSize: "28px" }}>Recupera tu contraseña.</h1>

            <form>
                <Input
                    type="email"
                    value={inputValues.emailInput}
                    name="emailInput"
                    onChange={handleChange}
                    placeholder="email"
                />
            </form>

            <Button onClick={onSubmit} style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                letterSpacing: "1.1px",
                marginBottom: "16px"
            }}>RECUPERAR CONTRASEÑA</Button>

        </ModalContainer>
    )
}

export default RecoverPassword

const ModalContainer = styled.div({
    width: "450px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "24px 52px",
    zIndex: "11",
    borderRadius: "15px",
    backgroundColor: "#121212",
    color: "white",
    textAlign: "center"
})

const CloseModal = styled.span`
    font-size: 28px;
    float: right;
    cursor: pointer;
`
const HomeBanner = styled.div`
    width: 100%;
    height: 80px;    
`

const Banner = styled.img`
    width: 130px;
    height: 70px;
    margin: 0 auto;
`

const Input = styled.input`
    width: 100%;
    display: block;
    padding: 12px 10px;
    margin: 8px 0;
    background-color: #212121;
    color: white;
    border: 0;
`

const Button = styled.button`
    width: 100%;
    padding: 13px 16px;
    margin-top: 16px;
    background-color: transparent;
    color: white;
    border-radius: 50px;
    font-size: 15px;
` */