import React, { useEffect, useState } from "react";
import { ModalSection } from "../../styles/modal/main";
import ModalService from "./services/modalService";

const ModalRoot = (props) => {
	const [modal, setModal] = useState({});

	const refresh = () => {
		props.refreshCards();
	};
	const refreshData = () => {
		props.refreshData();
	};
	const refreshEngines = () => props.refreshEngines();
	const refreshNickname = () => props.refreshNickname();

	useEffect(() => {
		ModalService.on("open", ({ component, props }) => {
			setModal({
				component,
				props,
				close: (value) => {
					setModal({});
				},
			});
		});
	}, []);

	const ModalComponent = modal.component ? modal.component : null;

	return (
		<ModalSection isRoot={modal.component}>
			{ModalComponent && (
				<ModalComponent
					{...modal.props}
					close={modal.close}
					changeBackgroundToImg={props.changeBackgroundToImg}
					changeBackgroundToLapse={props.changeBackgroundToLapse}
					changeBackgroundToCustom={props.changeBackgroundToCustom}
					changeBackgroundToColor={props.changeBackgroundToColor}
					changeBackgroundShadow={props.changeBackgroundShadow}
					refreshCards={refresh}
					refreshData={refreshData}
					refreshEngines={refreshEngines}
					refreshNickname={refreshNickname}
					style={{ display: "block" }}
					data={props.data}
					wd={props.wdir}
				/>
			)}
		</ModalSection>
	);
};

export default ModalRoot;
