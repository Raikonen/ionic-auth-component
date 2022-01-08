import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonSpinner,
  IonPage,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { moonOutline, arrowForwardOutline } from 'ionicons/icons';

import './Login.css'
import { useToast } from '../../utils/useToasts';

const Login: React.FC = () => {
  const Toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  type Inputs = {
    email: string,
    password: string,
  };

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const login = async (data: Inputs) => {
    setLoading(true);
    try { } catch (err) {
      Toast.info('Error logging with your credentials');
    } finally {
      setLoading(false);
    }
  };

  const responseGoogle = async (response: any) => {
    setLoading(true);
    try { } catch (err) {
      Toast.info('Error logging with your credentials');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkModeHandler = () => document.body.classList.toggle('dark');

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem slot="end" lines="none">
            <IonIcon icon={moonOutline} />
            <IonToggle name="darkMode" onIonChange={toggleDarkModeHandler} />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='auth-container'>
          <div className='auth-form-container'>
            <h2 className="login-header">Log in</h2>
            <GoogleLogin
              className='auth-google-login'
              clientId={process.env.REACT_APP_GOOGLE_API_KEY as string}
              buttonText="Continue With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <div className='auth-or'>
              <span>OR</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='auth-input'>
                <input required type="email" placeholder='Email' {...register("email")} />
                <input required type="password" placeholder='Password' {...register("password")} />
              </div>
              <IonButton type="submit" size="large" onSubmit={() => login} color="primary">
                {loading
                  ? <IonSpinner name="crescent" />
                  : <>Continue <IonIcon icon={arrowForwardOutline} /></>
                }
              </IonButton>
            </form>

            <div className="auth-prompt">
              <p>
                <Link to="/reset-password">Forgot password?</Link>
              </p>
              <p>
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
