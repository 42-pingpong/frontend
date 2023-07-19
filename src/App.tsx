import './App.css';
import { RecoilRoot } from 'recoil';
import Header from './component/Header/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Main } from './component/Main/Main';

function App() {
  return (
		<>
			<RecoilRoot>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Main/>} />
					</Routes>
				</BrowserRouter>
			</RecoilRoot>
		</>
  );
}

export default App;
