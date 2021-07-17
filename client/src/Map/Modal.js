import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Ar from '../Ar'

const Modal = (props) => {

	const [gameIsOpen, setGameIsOpen] = useState(false);

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
    {!gameIsOpen ? 
      <>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
        <button className="btn-modal-left" onClick={ props.closeModal }><ArrowBackIcon/></button>
        {props.markerId === 125 && <button className="btn-modal-right" onClick={ openGame }><VideogameAssetIcon/></button>}
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