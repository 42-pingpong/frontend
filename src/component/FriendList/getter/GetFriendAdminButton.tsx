import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';
import { RoleInChat } from '../../../enum/role.enum';
import { UserDto } from '../../../interfaces/User.dto';

export const GetFriendAdminButton = ({
  props,
  adminButtonVisible,
  role,
}: {
  props: UserDto;
  adminButtonVisible?: boolean;
  role: RoleInChat;
}) => {
  const navigation = useNavigate();
  const user = useRecoilValue(userInfo);

  const handleDirectMessage = () => {
    //socket emit
    if (props.id === user.id) return;
    navigation(`/direct-message/${props.id}`);
  };

  const handleSetAdmin = () => {
    console.log('set admin');
  };

  const handleUnSetAdmin = () => {
    console.log('unset admin');
  };

  if (adminButtonVisible?.valueOf()) {
    if (role === RoleInChat.owner) {
      return (
        <div>
          <div className="flex w-10 h-6">owner 버튼</div>
        </div>
      );
    } else if (role === RoleInChat.admin) {
      return (
        <div>
          <div className="flex w-10 h-6">
            <button onClick={handleUnSetAdmin}>admin 해제</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="flex w-10 h-6">
            <button onClick={handleSetAdmin}>admin 설정</button>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <div className="flex w-10 h-6">
          <img
            src={require('../../../public/plane.png')}
            className="ml-3"
            onClick={handleDirectMessage}
          />
        </div>
      </div>
    );
  }
};
