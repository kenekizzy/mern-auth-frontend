import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import FormContainer from "../components/FormContainer"
import { useRegisterMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const[updateUser, { isLoading}] = useRegisterMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Invalid Password Match")
            return 
        }
        try {
            const res = await updateUser({name, email, password }).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Successful")
        } catch (error) {
            toast.error("Errors")
            console.log(error)
        }
    }

  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
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
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen