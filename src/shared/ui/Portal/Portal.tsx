import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;    // "что" телепортируем
    element?: HTMLElement;  // "куда" телепортируем (контейнер, в который хотим телепортировать)
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body,    // телепортация происходит в раздел body
    } = props;

    return createPortal(children, element);
};
