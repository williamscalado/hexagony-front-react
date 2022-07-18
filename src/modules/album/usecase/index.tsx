import { HttpAdapter } from '../../../adapters/http/axios/index'
import { IAlbums, IAlbumUseCase } from '../domain'

const getAll = async () => {
  try {
    return await HttpAdapter.fetch({
      method: 'GET',
      url: '/album',
    })
  } catch (err: Error | any) {
    throw err
  }
}

const create = async (album: IAlbums) => {
  await HttpAdapter.fetch({
    url: '/album',
    method: 'POST',
    data: album,
  })
}

const update = async (album: IAlbums) => {
  await HttpAdapter.fetch({
    method: 'PUT',
    url: `/album/${album.id}`,
    data: album,
  })
}

const remove = async (id: string) => {
  await HttpAdapter.fetch({
    url: `/album/${id}`,
    method: 'DELETE',
  })
}

const getAlbumById = async (id: string) => {
  return await HttpAdapter.fetch({
    method: 'GET',
    url: `/album/${id}`,
  })
}

export const AlbumUseCase: IAlbumUseCase = {
  getAll,
  create,
  update,
  remove,
  getAlbumById,
}
