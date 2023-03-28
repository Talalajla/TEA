import React, { useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalBackgroundCards, ModalButton, ModalCardContainer, ModalContainer, ModalInput, ModalLabel } from "../../styles/modal/main";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import lapse from "./lapse.jpg";
import photos from "./photos/photos";

const BackgroundModal = (props) => {
	const [colorView, setColorView] = useState(false);
	const [imageView, setImageView] = useState(false);
	const [color, setColor] = useColor('hex', '#121212');

	const handlePhotoClick = (e) => {
		props.changeBackgroundToImg(e);
		props.close();
	}

	const handleLapseClick = () => {
		props.changeBackgroundToLapse();
		props.close();
	}

	return (
		<Modal close={props.close} bgGrid>
			<ModalPartHeader>Change background</ModalPartHeader>
			<ModalPartBody bgOverflow>
				<ModalContainer>
					<ModalCardContainer>
						<ModalBackgroundCards>
							<figure style={{cursor: 'not-allowed'}}>
								<img src="https://via.placeholder.com/150x85" />
								<figcaption>random (WIP)</figcaption>
							</figure>
							<figure onClick={handleLapseClick}>
								<img src={lapse} />
								<figcaption>24h lapse</figcaption>
							</figure>
							<figure style={{cursor: 'not-allowed'}}>
								<img src="https://via.placeholder.com/150x85" />
								<figcaption>color (WIP)</figcaption>
							</figure>
							{
							Object.entries(photos).map((photo, key) =>
								<figure key={key} onClick={handlePhotoClick}>
									<img src={photo[1]} data-index={key} />
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
