import { Link } from "react-router-dom";
import { ProfileModal } from "./ProfileModal";

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-400 md:px-3 py-1.5 shadow-lg">
        <div className="flex justify-between items-center mx-auto bg-fuchsia-500 md:px-0 flex-grow">
          <Link to="/" className="flex items-center">
						{/* md, sm 등 반응형: 은 그 크기 이상일 때 사용할 사이즈, 디폴트는 그 크기 이하일 때*/}
            <img
              src={require("../../public/logo.png")}
              className="ml-0 w-28 bg-red-300 flex-shrink-0"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center mr-0">
            <ProfileModal />
          </div>
        </div>
      </nav>
    </header>
  );
};



export default Header;
