import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonSpinner,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { moonOutline, arrowForwardOutline } from 'ionicons/icons';

import { useToast } from '../../utils/useToasts';

type Inputs = {
  email: string,
  password: string,
  confirmPassword: string,
};

const Signup: React.FC = () => {
  const Toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>(formOptions);
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const signup = async (data: Inputs) => {
    try { } catch (err) {
      Toast.info('Error logging with your credentials');
    } finally {
      setLoading(false);
    }
  }

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
            <h2 className="login-header">Create your account</h2>
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
                <input placeholder='Email' {...register("email")}
                  className={errors.email ? 'is-invalid' : ''} />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password" placeholder='Password' {...register("password", { minLength: 6 })}
                  className={errors.password ? 'is-invalid' : ''} />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="password" placeholder='Re-type Password' {...register("confirmPassword", { required: true })}
                  className={errors.confirmPassword ? 'is-invalid' : ''} />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              </div>
              <IonButton type="submit" size="large" onSubmit={() => signup} color="primary">
                {loading
                  ? <IonSpinner name="crescent" />
                  : <>Continue <IonIcon icon={arrowForwardOutline} /></>
                }
              </IonButton>
            </form>
            <div className="auth-prompt">
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Signup;
