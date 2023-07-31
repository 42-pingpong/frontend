import ConditionalProfileDisplay from './ConditionalProfileDisplay';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className=" bg-white px-3 py-1.5 shadow-lg rounded-b-3xl">
        <div className="flex justify-between items-center mx-auto md:px-0">
          <Link to="/" className="flex items-center">
            {/* md, sm 등 반응형: 은 그 크기 이상일 때 사용할 사이즈, 디폴트는 그 크기 이하일 때*/}
            <img
              src={require('../../public/logo.png')}
              className="w-24 2xl:w-28"
              alt="Logo"
            />
          </Link>
          <ConditionalProfileDisplay />
        </div>
      </nav>
    </header>
  );
};

export default Header;
