import { atom } from 'recoil';
import { IAlbums } from '../modules/album/domain';

export const albumListState = atom<IAlbums[]>({
  key: 'albumListState',
  default: [],
});

export const InitialUpdateAlbum = {
  id: '',
  name: '',
  length: 1,
};
export const albumUpdateState = atom<IAlbums>({
  key: 'albumUpdateState',
  default: {
    id: '',
    name: '',
    length: 1,
  },
});
