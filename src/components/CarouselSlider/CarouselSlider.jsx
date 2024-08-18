import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const images = [
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1711433959i/196056205.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1718910617i/203019740.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1699631079i/200028726.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1705545094i/204811915.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg',
  'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1717970538i/199698485.jpg',
];

export default function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    centerPadding: '0px',
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      }
    ],
  };

  return (
    <div className="carousel-container mt-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
