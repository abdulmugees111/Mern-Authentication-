import { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import CustomFacebookLoginButton from '../components/facebookBtn';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { BiHide, BiShow } from "react-icons/bi"; 
import "./LogIn-style/LogIn.css";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
   // }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    setName(firstName+" "+lastName);
    }, [firstName, lastName]);

      const responseGoogle = (response) => {
        console.log(response);
      };
      const handleLoginWithFacebook = () => {
        FB.login(function(response) {
          if (response.authResponse) {
            // User is authenticated, handle user data
            console.log('User is authenticated:', response);
          } else if (response.status === 'not_authorized') {
            // User has not authorized the app
            console.log('User has not authorized the app.');
          } else {
            // An error occurred
            console.log('Facebook login error:', response);
          }
        }, { scope: 'email' });
      };
      
  return (
    <main>
    <section className="container">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
        <img src="/Rectangle 4777.png" alt="Signup Image" className="img-fluid mobile-image" />
        </div>

        <div className="col-lg-5 col-sm-12 left-con ">
          <h2 className="fw-bold">Get's Started.</h2>
   <p className="mt-2">Have an account?  <NavLink to="/login">Sign in</NavLink></p>
          <form> <i className="bi bi-google me-2"></i> 
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                                 <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  buttonText="SignIn with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  className="btn-google mb-2 w-100"
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                 <CustomFacebookLoginButton onLoginWithFacebook={handleLoginWithFacebook}  facebookAppId="273711085626236"/>

              </div>
              <div className="or">
                  <div className="rectangle" />
                  <div className="text-wrapper">or</div>
                  <div className="rectangle" />
                  </div>
             
              <div className="input-container">
              <div className="col-12 mb-3">
              <label className="label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
              <label className="label">Last Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
            onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
              <label className="label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  id="email-address"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>
              <div className="col-12 mb-3">
              <label className="label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BiHide /> : <BiShow />} {/* Eye icon */}
                </button>
              </div>
            </div>
              <div className="col-12 mb-3">
              <label className="label">Company</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Company"
                />
              </div>
              </div>

              <div className="col-12 mb-3 mt-2 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
                </div>
                
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primarys"
                  onClick={submitHandler}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
          {isLoading && <Loader />}
                <Row className='py-3'>
                </Row>
          <button className="eng-btn english-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame">
          <path id="Vector" d="M10.5 21L15.75 9.75L21 21M12 18H19.5M3 5.621C4.9904 5.37332 6.99425 5.24941 9 5.25M9 5.25C10.12 5.25 11.233 5.288 12.334 5.364M9 5.25V3M12.334 5.364C11.176 10.658 7.69 15.08 3 17.502M12.334 5.364C13.23 5.425 14.119 5.511 15 5.621M10.411 14.116C8.77097 12.4486 7.47113 10.478 6.584 8.314" stroke="#242731" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </svg>
          I English</button>
          
        </div>
      </div>
    </section>
  </main>
  );
};

export default RegisterScreen;
