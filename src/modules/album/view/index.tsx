import React from 'react'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { ListAlbum } from './ListAlbum'
import { NewAlbum } from './NewAlbum'
import './style.scss'

export const PageAlbum = () => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <React.Fragment>
      <Header />
      <div className="container-albums" ref={ref}>
        <section className="content-album">
          <NewAlbum />
          <ListAlbum ref={ref} />
        </section>
      </div>
      <Footer />
    </React.Fragment>
  )
}
