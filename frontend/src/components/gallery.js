import "./css/reset.css";
import "./css/gallery.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TextView() {
    return (
        <div className="top-bar">
            <Link to="/" className="left-arrow">
                <i className="bi bi-caret-left-fill"></i>
            </Link>
            <span className="gallery-text">갤러리</span>
            <i className="bi bi-caret-right-fill"></i>
        </div>
    )
}

function PhotoView({ images }) {
    console.log(images)
    if (!images || images.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className="photo-container">
            {images.reverse().map((image, index) => (
                <div className="photo-item" key={index}>
                    <img src={`http://13.125.230.135:8081/images/${image}`} alt={`galleryImg${index + 1}`} />
                </div>
            ))}
        </div>
    );

}

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [time, setTime] = useState(0);

    useEffect(() => {
        document.body.style.backgroundImage = `url("../images/backgrounds/play_background1.png")`;

        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:8081/savephotoApi/gallery');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return <div className="photo-div">
        <TextView />
        <PhotoView images={images} />
    </div>
}