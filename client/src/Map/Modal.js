import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Ar from '../Ar'
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import Quizes from "../Quizes";
import './Modal.scss';


const Modal = (props) => {

  const markerId = props.markerId
  const content = props.content
  const modalIsOpen = props.modalIsOpen
  const closeModal = props.closeModal

	const [gameIsOpen, setGameIsOpen] = useState(false);

  //markerId : game JSX
  const games = {
    125 : Ar(1),
    275 : Ar(2),
    205 : Quizes()
  }

	const openGame = () => {
		setGameIsOpen(true)
	}	
  
  const closeGame = () => {
		setGameIsOpen(false)
	}

	return(
		<ReactModal
			isOpen={ modalIsOpen }
			className="modal"
			overlayClassName="modal-container"
		>

      {/* redirects back to root if modal is opened with a url */}
      <Router> 
        <Redirect to="/" />
      </Router>

      {!gameIsOpen ? 
        <>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <button className="btn-modal-left" onClick={ closeModal }><ArrowBackIcon/></button>
          {markerId in games && <button className="btn-modal-right" onClick={ openGame }><VideogameAssetIcon/></button>}
        </>
      : 
        <>
          <div className="modal-game-container">
            {games[markerId]}
          </div>
          <button className="btn-modal-left" onClick={ closeGame }><ArrowBackIcon/></button>
        </>
      }
		</ReactModal>
	)

}

export default Modal