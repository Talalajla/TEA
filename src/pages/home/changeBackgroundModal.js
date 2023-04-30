import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import { ModalBackgroundCards, ModalButton, ModalCardContainer, ModalContainer, ModalInput, ModalInputRange, ModalReturnView, ModalRow } from "../../styles/modal/main";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import lapse from "./lapse.jpg";
import wheel from "./colorWheel.jpg";
import OptimizedPhotos from "./photos/500/optimizedPhotos";
import { SearchCitiesBtn } from "../../styles/home/main";
import { BsCheckLg } from "react-icons/bs";
import { IoMdArrowBack } from 'react-icons/io'

const BackgroundModal = (props) => {
	const [colorView, setColorView] = useState(false);
	const [color, setColor] = useColor('hex', '#121212');
	const [shadow, setShadow] = useState('50');

	const customUrl = useRef('');
	const urlVal = localStorage.getItem('TEA_customBackgroundURL');

	const handlePhotoClick = (e) => {
		props.changeBackgroundToImg(e);
		props.close();
		localStorage.setItem('TEA_customBackgroundURL', '');
	}

	const handleLapseClick = () => {
		props.changeBackgroundToLapse();
		props.close();
		localStorage.setItem('TEA_customBackgroundURL', '');
	}

	const handleChangeCustomBg = () => {
		props.changeBackgroundToCustom();
		props.close();
		localStorage.setItem('TEA_customBackgroundURL', customUrl.current.value);
	}

	const handleChangeBgToColor = () => {
		props.changeBackgroundToColor(color.hex);
		props.close();
		localStorage.setItem('TEA_customBackgroundURL', '');
		localStorage.setItem('TEA_backgroundColor', color.hex);
	}

	const handleChangeShadow = (e) => {
		props.changeBackgroundShadow(e.target.value);
		localStorage.setItem('TEA_backgroundShadow', e.target.value);
	}

	useEffect(() => {
		if (localStorage.getItem('TEA_backgroundShadow'))
			setShadow(localStorage.getItem('TEA_backgroundShadow'));
	}, [])

	return (
		<Modal close={props.close} bgGrid>
			<ModalPartHeader>Change background</ModalPartHeader>
			<ModalPartBody bgOverflow>
				<ModalContainer>
					<ModalCardContainer>
						{
						!colorView &&
						<>
							<ModalRow style={{padding: '0 20px'}}>Custom background</ModalRow>
							<ModalContainer style={{display: 'flex', padding: '0 20px', margin: '5px 0 20px'}}>
								<ModalInput defaultValue={urlVal} ref={customUrl} flexfull style={{outline: 'none', padding: '15px 20px'}} placeholder="Paste web url to image..." />
								<SearchCitiesBtn onClick={handleChangeCustomBg} style={{outline: 'none'}}>
									<BsCheckLg />
								</SearchCitiesBtn>
							</ModalContainer>
							<ModalRow style={{padding: '0 20px'}}>Background shadow</ModalRow>
							<ModalRow style={{padding: '0 20px'}}>
								<ModalInputRange defaultValue={shadow} onChange={(e) => handleChangeShadow(e)} min='0' max='100' step='1' />
							</ModalRow>
							<ModalBackgroundCards>
								<figure style={{cursor: 'not-allowed'}}>
									<img src="https://via.placeholder.com/150x85" alt="work in progress" />
									<figcaption>random (WIP)</figcaption>
								</figure>
								<figure onClick={handleLapseClick}>
									<img src={lapse} alt="24 time-lapse photos of bay" />
									<figcaption>24h lapse</figcaption>
								</figure>
								<figure onClick={() => setColorView(true)}>
									<img src={wheel} alt="Color Wheel" />
									<figcaption>color</figcaption>
								</figure>
								{
								Object.entries(OptimizedPhotos).map((photo, key) =>
									<figure key={key} onClick={handlePhotoClick}>
										<img src={photo[1]} data-index={key} alt="nature beautyful background" />
									</figure>
								)}
							</ModalBackgroundCards>
						</>
						}
						{
							colorView &&
							<>
							<ModalReturnView onClick={() => setColorView(false)}><IoMdArrowBack /> return</ModalReturnView>
							<ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
							<ModalRow align='flex-end'>
								<ModalButton final onClick={handleChangeBgToColor}>
									Save
								</ModalButton>
							</ModalRow>
							</>
						}
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
		</Modal>
	);
};
export default BackgroundModal;
