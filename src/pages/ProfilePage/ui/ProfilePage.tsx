import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from '@/features/editableProfileCard';


interface ProfilePageProps {
    className?: string;     // для передачи параметров извне
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();


    return (
        // изолируем редюсер на уровне главного компонента
        // также удаляем профиль из стейта (removeAfterUnmount), т.к. хранить его, после того как ушли со страницы профиля, смысла нет
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage; // для асинхронных компонентов используется дефолтный экспорт
