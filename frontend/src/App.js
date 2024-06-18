import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/home"
import Gallery from "./components/gallery"
import Story from "./components/story"
import Choice from "./components/choice"
import Round from "./components/round"
import Storymanager from './components/storymanager';
import ResultPlayview2 from './components/resultPlayview2';
import Photo from './components/photo'
import BackgroundMusic from './backgroundMusic'

function App() {
  return (
    <div className='App'>
		<BackgroundMusic />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/gallery" element={<Gallery />}></Route>
				<Route path="/story" element={<Story />}></Route>
				<Route path="/choice" element={<Choice />}></Route>
				<Route path="/round" element={<Round />}></Route>
				<Route path="/storymanager" element={<Storymanager />}></Route>
				<Route path="/resultPlayview2" element={<ResultPlayview2 />}></Route>
				<Route path="/photo" element={<Photo />}></Route>
			</Routes>
		</BrowserRouter>
	</div>
  );
}



export default App;
