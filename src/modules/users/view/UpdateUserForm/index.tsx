import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsCheckAll } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loadingState } from '../../../../state/sharedState';
import { userState, userUpdateState } from '../../../../state/userState';
import { IUser, IUserUpdate } from '../../domain';
import { userUseCase } from '../../usecase';
import { userFormValidationUpdate } from '../../validation';
import './style.scss';

export const FormUserUpdate = () => {
  const stateUpdate = useRecoilState(userUpdateState);
  const setStateUpdate = useSetRecoilState(userUpdateState);
  const setUserList = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    resolver: yupResolver(userFormValidationUpdate),
  });

  const isEdition = React.useMemo(
    () => ({
      id: stateUpdate[0].id || '',
      name: stateUpdate[0].name || '',
      email: stateUpdate[0].email || '',
    }),
    [stateUpdate],
  );

  const setFieldValue = React.useCallback(() => {
    reset({
      name: isEdition.name,
      email: isEdition.email,
    });
  }, [reset, isEdition.name, isEdition.email]);

  useEffect(() => {
    setFieldValue();
  }, [setFieldValue]);

  const handleCancelUpdate = () => {
    setStateUpdate({
      isEdition: false,
    } as IUserUpdate);
  };

  const onSubmit = async (data: IUserUpdate) => {
    try {
      setLoading(true);
      const newDataUpdate = {
        ...data,
        id: isEdition.id,
      };
      await userUseCase.update(newDataUpdate);
      const res = await userUseCase.getAll();
      setUserList(res);
      setStateUpdate({
        isEdition: false,
      } as IUserUpdate);
      toast.success('user updated');
    } catch (err: Error | any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-new-form-user">
      <h3>Update user</h3>
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
        <span>{errors.passwordConfirmation && errors.passwordConfirmation.message}</span>
        <button type="submit" form="hook-form" className="buttonSend">
          <BsCheckAll className="btn-icon" />
          Save
        </button>
        <button
          type="button"
          className="buttonCancel"
          onClick={() => {
            handleCancelUpdate();
          }}
        >
          <MdCancel className="btn-icon" />
          Cancel
        </button>
      </form>
    </div>
  );
};
