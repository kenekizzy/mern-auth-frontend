import FormContainer from "../components/FormContainer"
import { useState, useEffect } from "react"
import Loader from "../components/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { Form, Button, Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log({email, password})
        try {
            const res = await login({ email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Successful")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Errors")
        }
    }
  return (
    <FormContainer onSubmit={submitHandler}>
        <h1>Sign In</h1>
        <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address" value={email} onChange={ (e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={ (e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} className="mt-3" variant="primary" type="submit">Submit</Button>

        {isLoading && <Loader />}

        <Row className="py-3">
            <Col>
                <Link to="/register">Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen