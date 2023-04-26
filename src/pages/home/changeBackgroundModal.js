import React, { useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalBackgroundCards, ModalButton, ModalCardContainer, ModalContainer, ModalInput, ModalLabel, ModalRow } from "../../styles/modal/main";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import lapse from "./lapse.jpg";
import OptimizedPhotos from "./photos/500/optimizedPhotos";
import { SearchCitiesBtn } from "../../styles/home/main";
import { BsCheckLg } from "react-icons/bs";

const BackgroundModal = (props) => {
	const [colorView, setColorView] = useState(false);
	const [imageView, setImageView] = useState(false);
	const [color, setColor] = useColor('hex', '#121212');
	const customUrl = useRef('');
	const urlVal = localStorage.getItem('TEA_customBackgroundURL');

	const handlePhotoClick = (e) => {
		props.changeBackgroundToImg(e);
		localStorage.setItem('TEA_customBackgroundURL', '');
		props.close();
	}

	const handleLapseClick = () => {
		props.changeBackgroundToLapse();
		localStorage.setItem('TEA_customBackgroundURL', '');
		props.close();
	}

	const handleChangeCustomBg = () => {
		localStorage.setItem('TEA_customBackgroundURL', customUrl.current.value);
		props.changeBackgroundToCustom();
		props.close();
	}

	return (
		<Modal close={props.close} bgGrid>
			<ModalPartHeader>Change background</ModalPartHeader>
			<ModalPartBody bgOverflow>
				<ModalContainer>
					<ModalCardContainer>
						<ModalRow style={{padding: '0 20px'}}>Custom background</ModalRow>
						<ModalContainer style={{display: 'flex', padding: '0 20px', margin: '5px 0 20px'}}>
							<ModalInput defaultValue={urlVal} ref={customUrl} flexfull style={{outline: 'none', padding: '15px 20px'}} placeholder="Paste web url to image..." />
							<SearchCitiesBtn onClick={handleChangeCustomBg} style={{outline: 'none'}}>
								<BsCheckLg />
							</SearchCitiesBtn>
						</ModalContainer>
						<ModalBackgroundCards>
							<figure style={{cursor: 'not-allowed'}}>
								<img src="https://via.placeholder.com/150x85" alt="work in progress" />
								<figcaption>random (WIP)</figcaption>
							</figure>
							<figure onClick={handleLapseClick}>
								<img src={lapse} alt="24 time-lapse photos of bay" />
								<figcaption>24h lapse</figcaption>
							</figure>
							<figure style={{cursor: 'not-allowed'}}>
								<img src="https://via.placeholder.com/150x85" alt="work in progress" />
								<figcaption>color (WIP)</figcaption>
							</figure>
							{
							Object.entries(OptimizedPhotos).map((photo, key) =>
								<figure key={key} onClick={handlePhotoClick}>
									<img src={photo[1]} data-index={key} alt="nature beautyful background" />
								</figure>
							)}
						</ModalBackgroundCards>
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
		</Modal>
	);
};
export default BackgroundModal;
