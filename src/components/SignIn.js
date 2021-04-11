import React, { useState } from "react";
import styled from "@emotion/styled";
import banner from "../images/banner.png"

function SignIn({ show, firebase, openSignUpModal, closeModal }) {
    const showHideClassName = show ? "block" : "none";

    const initialState = {
        mailInput: "",
        passwdInput: ""
    }

    const [inputValues, setInputValues] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }

    const onSubmit = event => {

        firebase
            .doSignInWithEmailAndPassword(inputValues.mailInput, inputValues.passwdInput)
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
        <ModalContainer showHide={showHideClassName}>
            <CloseModal onClick={closeModal}>&times;</CloseModal>
            <HomeBanner>
                <Banner src={banner} />
            </HomeBanner>
            <h1 style={{ marginBottom: "16px", fontSize: "28px" }}>Para continuar, inicia sesión.</h1>

            <form>
                <Input
                    type="text"
                    value={inputValues.mailInput}
                    name="mailInput"
                    onChange={handleChange}
                    placeholder="email"
                />

                <Input
                    type="text"
                    value={inputValues.passwdInput}
                    name="passwdInput"
                    onChange={handleChange}
                    placeholder="contraseña"
                />
            </form>

            <InfoText style={{ textAlign: "left" }}>Restablecer contraseña</InfoText>

            <Button onClick={onSubmit} style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                letterSpacing: "1.1px",
                marginBottom: "16px"
            }}>INICIAR SESIÓN</Button>

            <hr />

            <Button>Registrar-se con Facebook</Button>
            <Button>Registrar-se con Google</Button>
            <Button>Registrar-se con Apple</Button>
            <InfoText style={{ marginTop: "24px" }} onClick={openSignUpModal}>¿No tienes cuenta? 
                <span style={{ textDecoration: "underline"}}>REGISTRATE</span>
            </InfoText>
        </ModalContainer>
  
    )
}

export default SignIn;

const ModalContainer = styled.div({
    width: "450px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "24px 52px",
    zIndex: "10",
    borderRadius: "15px",
    backgroundColor: "#121212",
    color: "white",
    textAlign: "center"
}, props => ({ display: `${props.showHide}` }))

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

const InfoText = styled.p`
    font-size: 13px;
    color: gray;
    margin: 16px 0;
    cursor: pointer;
    &:hover {
        color: white;
    }
`

const Button = styled.button`
    width: 100%;
    padding: 13px 16px;
    margin-top: 16px;
    background-color: transparent;
    color: white;
    border-radius: 50px;
    font-size: 15px;
`