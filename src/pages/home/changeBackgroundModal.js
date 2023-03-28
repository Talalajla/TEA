import React, { useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalBackgroundCards, ModalButton, ModalCardContainer, ModalContainer, ModalInput, ModalLabel } from "../../styles/modal/main";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const BackgroundModal = (props) => {
	const [colorView, setColorView] = useState(false);
	const [imageView, setImageView] = useState(false);
	const [color, setColor] = useColor('hex', '#121212');
	return (
		<Modal close={props.close} bgGrid>
			<ModalPartHeader>Change background</ModalPartHeader>
			<ModalPartBody bgOverflow>
				<ModalContainer>
					<ModalCardContainer>
						<ModalBackgroundCards>
							<figure>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>24h lapse</figcaption>
							</figure>
							<figure onClick={() => setImageView(true)}>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>choose image</figcaption>
							</figure>
							<figure>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>random</figcaption>
							</figure>
							<figure onClick={() => setColorView(true)}>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>color</figcaption>
							</figure>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test1</figcaption>
							</div>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test2</figcaption>
							</div>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test3</figcaption>
							</div>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test4</figcaption>
							</div>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test4</figcaption>
							</div>
							<div>
								<img src="https://via.placeholder.com/150x100" />
								<figcaption>test4</figcaption>
							</div>
						</ModalBackgroundCards>
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalCardContainer footer>
					<ModalButton onClick={props.close} hov>
						Cancel
					</ModalButton>
					<ModalButton final>
						Save
					</ModalButton>
				</ModalCardContainer>
			</ModalPartFooter>
		</Modal>
	);
};
export default BackgroundModal;
