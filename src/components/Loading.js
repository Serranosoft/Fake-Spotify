import React from "react"
import styled from "@emotion/styled"
import { keyframes } from '@emotion/react'
const Loading = () => <Spinner />

export default Loading

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`

  border: 50px solid #eee;
  border-top: 50px solid #1db954;
  border-radius: 50%;
  width: 80px;
  height: 70px;
  animation: ${spin} 1s linear infinite;
  margin: 24px auto;
`