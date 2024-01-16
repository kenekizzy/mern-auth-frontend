import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../slices/userApiSlice"
import { toast } from "react-toastify"
import { setCredentials } from "../slices/authSlice"

const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await register({ name, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("successful")
        } catch (error) {
            console.log(error)
            toast.error("Errors")
        }
    }
  return (
   <FormContainer onSubmit={submitHandler}>
        <h1>Register</h1>
        <Form.Group className="my-2" controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={ (e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address" value={email} onChange={ (e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={ (e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirm-password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} className="mt-3" type="submit">Submit</Button>

        {isLoading && <Loader />}

        <Row className="py-3">
            <Col>
                Already have an account? <Link to="/login">Login</Link>
            </Col>
        </Row>
   </FormContainer>
  )
}

export default RegisterScreen