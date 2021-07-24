import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Ar from '../Ar'
import { Redirect, BrowserRouter as Router } from 'react-router-dom';

const Modal = (props) => {

	const [gameIsOpen, setGameIsOpen] = useState(false);
  const gameMarkerIds = [
    125, 
    275
  ]

	const openGame = () => {
		setGameIsOpen(true)
	}	
  
  const closeGame = () => {
		setGameIsOpen(false)
	}

	return(
		<ReactModal
			isOpen={ props.modalIsOpen }
			className="modal"
			overlayClassName="modal-container"
		>
      <Router>
        <Redirect to="/" />
      </Router>
      {!gameIsOpen ? 
        <>
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
          <button className="btn-modal-left" onClick={ props.closeModal }><ArrowBackIcon/></button>
          {gameMarkerIds.some(id => id === props.markerId) && <button className="btn-modal-right" onClick={ openGame }><VideogameAssetIcon/></button>}
        </>
      : 
        <>
          <div className="modal-game-container">
            <Ar />
          </div>
          <button className="btn-modal-left" onClick={ closeGame }><ArrowBackIcon/></button>
        </>
      }
		</ReactModal>
	)

}

export default Modal