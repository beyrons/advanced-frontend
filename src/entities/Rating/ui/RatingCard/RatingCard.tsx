import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';


interface RatingCardProps {
    className?: string;
    title?: string;             // заголовок
    feedbackTitle?: string;     // что будем писать внутри модального окна
    hasFeedback?: boolean;      // в каких-то случаях нам понадобится только выбрать количество звезд, либо еще добавить отзыв
    onAccept?: (starsCount: number, feedback?: string) => void;     // отправить отзыв
    onCancel?: (starsCount: number) => void;                        // отменить отзыв, отправляем только количество звезд
    rate?: number;              // передаем количество звезд, которые поставил пользователь
}


export const RatingCard = memo((props: RatingCardProps) => {
    const { className, onCancel, onAccept, hasFeedback, feedbackTitle, title, rate = 0 } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);          // открыто модальное окно или нет
    const [starsCount, setStarsCount] = useState(rate);             // количество звезд поставленное пользователем
    const [feedback, setFeedback] = useState('');                   // отзыв


    const onSelectedStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);              // сохраняем количество звезд
        if (hasFeedback) {
            setIsModalOpen(true);                       // когда пользователь выбрал количество звезд - открываем окно для ввода отзыва
        } else {
            onAccept?.(selectedStarsCount);             // если пользователь не оставил отзыв, отправляем "наверх" количество звезд
        }
    }, [hasFeedback, onAccept]);


    const acceptHandle = useCallback(() => {            // обработка кнопки "Отправить"
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {            // обработка кнопки "Отмена"
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('Ваш отзыв')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    );


    return (
        <Card className={className} max>
            <VStack align="center" gap="8" max>
                <Text title={starsCount ? t('Ваша оценка') : title} />
                <StarRating size={40} selectedStars={starsCount} onSelect={onSelectedStars} />
            </VStack>

            {/* отзыв */}
            {/* версия для браузера */}
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap="32" max>
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button onClick={acceptHandle}>
                                {t('Отправить')}
                            </Button>
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                                {t('Закрыть')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>

            {/* версия для мобильных устройств */}
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
                    <VStack gap="32">
                        {modalContent}
                        <Button onClick={acceptHandle} size={ButtonSize.L} fullWidth>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
