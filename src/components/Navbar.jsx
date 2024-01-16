import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/userApiSlice'
import { toast } from 'react-toastify'

const Navbars = () => {

    const { userInfo } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [logout] = useLogoutMutation()

    const logoutHandler = async (e) => {
        e.preventDefault()
        try {
            await logout().unwrap()
            dispatch(logout())
            toast.success("Successful")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error()
        }
    }
  return (
    <nav>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>MERN AUTH</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        {userInfo ?
                            <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        :
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>
                                        <FaSignOutAlt /> Sign Up
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </nav>
  )
}

export default Navbars