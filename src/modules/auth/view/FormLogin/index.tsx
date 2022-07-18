import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { IFormLogin } from '../../domain'
import { FormUseCase } from '../../usecase'
import { formRules } from '../../validation'
import './style.scss'

export const FormLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleVisiblePassword = (inputName: string) =>
    showPassword ? setShowPassword(false) : setShowPassword(true)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormLogin>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    resolver: yupResolver(formRules),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (credentials: IFormLogin) => {
    try {
      setLoading(true)
      await FormUseCase.authenticate(credentials)
      navigate('/')
    } catch (err: Error | any) {
      toast.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div className="ContainerLogin">
        <form onSubmit={handleSubmit(onSubmit)} id="formLogin">
          <label htmlFor="email">E-mail </label>
          <input
            {...register('email')}
            type="text"
            data-testid="email"
            placeholder="email@x.com"
          />
          {<span>{errors?.email?.message}</span>}
          <label htmlFor="password">Password </label>
          <span className="user-password">
            <input
              type={showPassword ? 'text' : 'password'}
              data-testid="password"
              {...register('password')}
              placeholder="********"
            />
            <button type="button" onClick={() => handleVisiblePassword('password')}>
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </button>
          </span>
          {<span>{errors?.password?.message}</span>}

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}
