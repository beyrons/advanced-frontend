import { Flex, FlexProps } from '../Flex/Flex';


// пропсы принимающие горизонтальный стэк
type HStackProps = Omit<FlexProps, 'direction'>         // из FlexProps исключаем 'direction'

export const HStack = (props: HStackProps) => {         // memo не используем, т.к. используется комопнент children, т.е. 100% будет перерисовка
    return (
        <Flex direction="row" {...props} />
    );
};
