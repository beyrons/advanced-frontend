import { Flex, FlexProps } from '../Flex/Flex';


// пропсы принимающие вертикальный стэк
type VStackProps = Omit<FlexProps, 'direction'>         // из FlexProps исключаем 'direction'

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return (
        <Flex {...props} direction="column" align={align} />
    );
};
