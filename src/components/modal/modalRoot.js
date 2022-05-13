import React, { useEffect, useState } from "react";
import { ModalSection } from "../../styles/modal/main";
import ModalService from "./services/modalService";

const ModalRoot = () => {
	const [modal, setModal] = useState({});

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
			{ModalComponent && <ModalComponent {...modal.props} close={modal.close} style={{ display: "block" }} />}
		</ModalSection>
	);
};

export default ModalRoot;
