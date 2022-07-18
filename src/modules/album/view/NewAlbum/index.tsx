import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCheckAll } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  albumListState,
  albumUpdateState,
  InitialUpdateAlbum,
} from '../../../../state/albumState'
import { loadingState } from '../../../../state/sharedState'
import { IAlbums } from '../../domain'
import { AlbumUseCase } from '../../usecase'
import { newAlbumFormRule } from '../../validation'
import './style.scss'

export const NewAlbum = () => {
  const setAlbumsState = useSetRecoilState(albumListState)
  const updateAlbum = useRecoilState(albumUpdateState)
  const setUpdateAlbum = useSetRecoilState(albumUpdateState)
  const setLoading = useSetRecoilState(loadingState)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAlbums>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    resolver: yupResolver(newAlbumFormRule),
  })

  const isEdition = React.useMemo(
    () => ({
      id: updateAlbum[0].id,
      name: updateAlbum[0].name || '',
      length: updateAlbum[0].length || 1,
    }),
    [updateAlbum],
  )

  const setFields = React.useCallback(() => {
    if (isEdition?.id) {
      reset({ name: isEdition.name, length: isEdition.length })
      return
    }
    reset({ name: '', length: 1 })
  }, [isEdition.id, isEdition.name, isEdition.length, reset])

  React.useEffect(() => {
    setFields()
  }, [setFields])

  const onSubmit = async (data: IAlbums) => {
    try {
      setLoading(true)
      const newData: IAlbums = {
        ...data,
        length: +data.length,
      }
      const newDataUpdate = {
        ...newData,
        id: updateAlbum[0].id,
      }

      const updateStatus = updateAlbum[0].id
      updateStatus
        ? await AlbumUseCase.update(newDataUpdate)
        : await AlbumUseCase.create(newData)

      const res = await AlbumUseCase.getAll()
      setAlbumsState(res)
      setUpdateAlbum(InitialUpdateAlbum)
      reset({ name: '', length: 1 })
      toast.success(updateStatus ? 'album updated' : 'album created')
    } catch (error) {
      toast.error(
        updateAlbum[0]?.id ? 'failed to update album' : 'failed to create album',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCancelUpdate = () => {
    setUpdateAlbum(InitialUpdateAlbum)
    reset({ name: '', length: 1 })
  }

  return (
    <div className="container-new-album">
      <h3>{updateAlbum[0]?.id ? 'Update' : 'New'} Album</h3>
      <div className="content-new-album">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Name</label>
          <input {...register('name')} type="text" />
          {errors?.name && <span>{errors?.name?.message} </span>}
          <label htmlFor="">Length</label>
          <input {...register('length')} type="number" />
          {errors?.length && <span>{errors.length.message}</span>}
          <button>
            <BsCheckAll className="btn-icon" />
            Save
          </button>
          {updateAlbum[0]?.id && (
            <button className="btn-cancel" onClick={() => handleCancelUpdate()}>
              <MdCancel className="btn-icon" />
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
