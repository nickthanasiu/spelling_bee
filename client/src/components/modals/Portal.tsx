import { createPortal } from "react-dom";
import { PropsWithChildren } from "react";

interface Props {
    wrapperId: string;
}

const Portal = ({ children, wrapperId = 'react-portal-wrapper' }: PropsWithChildren<Props>) => {

    let element = document.getElementById(wrapperId);

    if (!element) {
        element = createWrapperAndAppendToBody(wrapperId);
    }
    
    return createPortal(children, element);
};

export default Portal;

function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}