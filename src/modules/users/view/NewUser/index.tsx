import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsCheckAll, BsEye, BsEyeSlash } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../../../state/sharedState';
import { userState } from '../../../../state/userState';
import { IUser } from '../../domain';
import { userUseCase } from '../../usecase';
import { userFormValidation } from '../../validation';
import './style.scss';

interface IPassword {
  [key: string]: boolean;
}
const InitialStatusPassword = {
  password: false,
  passwordConfirm: false,
};
export const NewUserForm = () => {
  const setUserAllUser = useSetRecoilState<IUser[]>(userState);
  const [showPassword, setShowPassword] = useState<IPassword>(InitialStatusPassword);
  const setLoading = useSetRecoilState(loadingState);

  const handleVisiblePassword = (inputName: string) => {
    showPassword[`${inputName}`]
      ? setShowPassword({
          ...showPassword,
          [`${inputName}`]: false,
        })
      : setShowPassword({
          ...showPassword,
          [`${inputName}`]: true,
        });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    resolver: yupResolver(userFormValidation),
  });

  const onSubmit = async (data: IUser) => {
    try {
      setLoading(true);
      delete data.passwordConfirmation;
      await userUseCase.create(data);
      const res = await userUseCase.getAll();
      setUserAllUser(res);
      reset();
      toast.success('user created');
    } catch (err: Error | any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-new-form-user">
      <div className="avatar-user">
        <img src="../../assets/image/user-avatar.png" alt="User Avatar" />
      </div>

      <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Full Name</label>
        <input {...register('name')} type="text" />
        <span>{errors?.name && errors.name.message}</span>
        <label htmlFor="email">Email</label>
        <input type="text" {...register('email')} />
        <span>{errors?.email && errors.email.message}</span>

        <label htmlFor="password">Password</label>
        <span className="user-password">
          <input type={showPassword.password ? 'text' : 'password'} {...register('password')} />
          <button type="button" onClick={() => handleVisiblePassword('password')}>
            {showPassword.password ? <BsEye /> : <BsEyeSlash />}
          </button>
        </span>
        <span>{errors?.password && errors.password.message}</span>
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <span className="user-password">
          <input
            type={showPassword.passwordConfirm ? 'text' : 'password'}
            {...register('passwordConfirmation')}
          />
          <button type="button" onClick={() => handleVisiblePassword('passwordConfirm')}>
            {showPassword.passwordConfirm ? <BsEye /> : <BsEyeSlash />}
          </button>
        </span>
        <span>{errors.passwordConfirmation && errors.passwordConfirmation.message}</span>
        <button type="submit" form="hook-form" className="buttonSend">
          <BsCheckAll className="btn-icon" />
          Save
        </button>
      </form>
    </div>
  );
};
